// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";

import {Character721} from "./Character721.sol";
import {Item20} from "./Item20.sol";

contract Autarch {
    error SenderAlreadyHasCharacter(address sender);

    event ItemCreated(
        address indexed item,
        bytes32 indexed itemId,
        string name,
        string symbol
    );

    event DungeonCreated(
        bytes32 indexed dungeonId,
        uint256 totalEncounters
    );

    event CharacterMinted(
        uint256 indexed characterId,
        string name,
        uint256 classIndex
    );

    event DungeonStarted(
        uint256 indexed characterId,
        bytes32 indexed dungeonId,
        uint256[] encounterIndexes
    );

    event DungeonRest(
        uint256 indexed characterId,
        uint256 prevHp,
        uint256 newHp,
        uint256[] encounterIndexes
    );

    event DungeonMonster(
        uint256 indexed characterId,
        // TODO: Add more data
        uint256 gainedExp,
        uint256[] encounterIndexes
    );

    event DungeonItem(
        uint256 indexed characterId,
        address indexed item,
        bytes32 indexed itemId,
        uint256 gainedExp,
        uint256[] encounterIndexes
    );

    enum ItemType {
        WEAPON,
        ITEM
    }

    enum EffectTrigger {
        PASSIVE,
        BATTLE_START,
        TURN_START,
        WOUNDED,
        EXPOSED
    }

    enum EffectType {
        HEAL,
        ARMOR,
        DAMAGE,
        POISON,
        ACID,
        STUN,
        MAX_HP,
        ATTACK,
        SPEED
    }

    enum MonsterResolution {
        CHARACTER_DEATH,
        MONSTER_DEATH,
        FLED
    }

    struct Stats {
        uint256 maxHp; // +Apprentice
        uint256 armor; // +Knight
        uint256 attack; // +Magician
        uint256 speed; // +Rogue
    }

    struct Status {
        uint256 poison;
        uint256 acid;
        uint256 stun;
    }

    struct Actor {
        uint256 hp;
        Stats stats;
    }

    struct Monster {
        uint256 exp;
        Actor actor;
        Effect[] effects;
    }

    struct Effect {
        EffectTrigger effectTrigger;
        EffectType effectType;
        uint256 value;
        bool self;
    }

    struct ItemData {
        ItemType itemType;
        Effect[] effects;
    }

    struct StartingItem {
        bytes32 itemId;
        uint256 amount;
    }

    struct MonsterEncounter {
        uint256 chance;
        bytes32 monsterId;
    }

    struct ItemEncounter {
        uint256 chance;
        bytes32 itemId;
    }

    struct Dungeon {
        uint256 totalEncounters;
        uint256 restChance;
        uint256 monsterChance;
        uint256 itemChance;
        MonsterEncounter[] monsterEncounters;
        ItemEncounter[] itemEncounters;
    }

    struct DungeonProgress {
        bytes32 dungeonId;
        uint256[] encounterIndexes;
        uint256 encounterCount;
        Actor character;
        bytes32[] itemIds;
    }

    // Mutable per-actor state for a single monster fight. Passed by reference
    // between the combat helpers so effect stubs can mutate it in place.
    struct Combatant {
        Actor actor; // hp + stats (stats may change mid-battle via effects)
        uint256 armor; // per-battle depletable shield (resets each fight)
        bool hadArmor;
        Status status; // poison, acid, stun
        bool wounded; // WOUNDED already triggered (fires once per actor)
        bool exposed; // EXPOSED already triggered (fires once per actor)
        bytes32[] itemIds; // equipped items (character); empty for the monster
        Effect[] effects; // innate effects (monster); empty for the character
    }

    Character721 public character721;

    Item20 public item20Implementation;

    mapping(bytes32 itemId => address item) private _itemAddresses;
    mapping(bytes32 itemId => ItemData data) private _itemData;
    StartingItem[] private _startingItems;

    mapping(bytes32 monsterId => Monster) private _monsters;

    mapping(bytes32 dungeonId => Dungeon) private _dungeons;
    mapping(uint256 characterId => DungeonProgress) private _dungeonProgress;

    constructor() {
        character721 = new Character721("Autarch Character", "aCHAR");

        item20Implementation = new Item20();
    }

    function setStartingItems(StartingItem[] memory newStartingItems) external {
        delete _startingItems;
        for (uint256 i = 0; i < newStartingItems.length; i++) {
            _startingItems.push(newStartingItems[i]);
        }
    }

    function createItem(
        string memory name,
        string memory symbol,
        ItemData memory data
    ) external returns (address) {
        bytes32 itemId;
        bytes memory packed = bytes(symbol);
        require(packed.length <= 32, "Symbol too long");
        assembly {
            itemId := mload(add(packed, 32))
        }
        if (_itemExists(itemId)) {
            revert("Item already exists");
        }

        return _createItem(itemId, name, symbol, data);
    }

    function _itemExists(bytes32 itemId) internal view returns (bool) {
        return _itemAddresses[itemId] != address(0);
    }

    function createMonster(
        bytes32 monsterId,
        uint256 exp,
        Actor memory actor,
        Effect[] memory effects
    ) external {
        if (_monsterExists(monsterId)) {
            revert("Monster already exists");
        }
        if(effects.length == 0) {
            revert("Effects cannot be empty");
        }

        _monsters[monsterId].exp = exp;
        _monsters[monsterId].actor = actor;
        for (uint256 i = 0; i < effects.length; i++) {
            _monsters[monsterId].effects.push(effects[i]);
        }
    }

    function _monsterExists(bytes32 monsterId) internal view returns (bool) {
        return _monsters[monsterId].effects.length > 0;
    }

    function createDungeon(
        bytes32 dungeonId,
        uint256 totalEncounters,
        uint256 restChance,
        uint256 monsterChance,
        uint256 itemChance,
        MonsterEncounter[] memory monsterEncounters,
        ItemEncounter[] memory itemEncounters
    ) external {
        if (_dungeonExists(dungeonId)) {
            revert("Dungeon already exists");
        }
        if (restChance + monsterChance + itemChance == 0) {
            revert("Total chance must be greater than zero");
        }
        if (monsterChance > 0) {
            uint256 sum;
            for (uint256 i = 0; i < monsterEncounters.length; i++) {
                sum += monsterEncounters[i].chance;
            }
            if (sum == 0) {
                revert("Monster chance set but no weighted monster encounters");
            }
        }
        if (itemChance > 0) {
            uint256 sum;
            for (uint256 i = 0; i < itemEncounters.length; i++) {
                sum += itemEncounters[i].chance;
            }
            if (sum == 0) {
                revert("Item chance set but no weighted item encounters");
            }
        }

        _dungeons[dungeonId].totalEncounters = totalEncounters;
        _dungeons[dungeonId].restChance = restChance;
        _dungeons[dungeonId].monsterChance = monsterChance;
        _dungeons[dungeonId].itemChance = itemChance;
        for (uint256 i = 0; i < monsterEncounters.length; i++) {
            _dungeons[dungeonId].monsterEncounters.push(monsterEncounters[i]);
        }
        for (uint256 i = 0; i < itemEncounters.length; i++) {
            _dungeons[dungeonId].itemEncounters.push(itemEncounters[i]);
        }

        emit DungeonCreated(dungeonId, totalEncounters);
    }

    function _dungeonExists(bytes32 dungeonId) internal view returns (bool) {
        return _dungeons[dungeonId].totalEncounters > 0;
    }

    function mintCharacter(
        string memory name,
        uint256 classIndex
    ) external returns (uint256 characterId) {
        if (character721.balanceOf(msg.sender) > 0) {
            revert SenderAlreadyHasCharacter(msg.sender);
        }

        characterId = character721.mint(name, classIndex);

        for (uint256 i = 0; i < _startingItems.length; i++) {
            Item20(_itemAddresses[_startingItems[i].itemId]).mint(
                msg.sender,
                _startingItems[i].amount
            );
        }

        emit CharacterMinted(characterId, name, classIndex);
    }

    function startDungeon(
        bytes32 dungeonId,
        uint256 characterId,
        bytes32[] memory itemIds
    ) external returns (uint256[] memory encounterIndexes) {
        if (character721.ownerOf(characterId) != msg.sender) {
            revert("Character not owned by sender");
        }
        if (_dungeonProgress[characterId].encounterCount > 0) {
            revert("Character already in a dungeon");
        }
        if (!_dungeonExists(dungeonId)) {
            revert("Dungeon does not exist");
        }
        if (itemIds.length == 0) {
            revert("Must at least equip a weapon");
        }
        for (uint256 i = 0; i < itemIds.length; i++) {
            if((i == 0 && _itemData[itemIds[i]].itemType != ItemType.WEAPON) || (i > 0 && _itemData[itemIds[i]].itemType != ItemType.ITEM)) {
                revert("First item must be a weapon, other items must be items");
            }
            // Allows single item to be equipped multiple times, good enough for hackathon
            if (Item20(_itemAddresses[itemIds[i]]).balanceOf(msg.sender) < 1 ether) {
                revert("Item not owned by sender");
            }
        }

        Dungeon memory dungeon = _dungeons[dungeonId];

        encounterIndexes = _rollEncounters(dungeon, characterId);

        // PASSIVE stat effects from equipped items are applied once, here, so they
        // don't compound (and skew hp/maxHp) if re-applied every encounter.
        Actor memory character = _applyPassiveStats(
            character721.getCharacter(characterId),
            itemIds
        );

        _dungeonProgress[characterId] = DungeonProgress({
            dungeonId: dungeonId,
            encounterIndexes: encounterIndexes,
            encounterCount: 1,
            character: character,
            itemIds: itemIds
        });

        emit DungeonStarted(characterId, dungeonId, encounterIndexes);
    }

    function continueDungeon(
        uint256 characterId,
        uint256 encounterIndex
    ) external returns (uint256[] memory encounterIndexes) {
        if (character721.ownerOf(characterId) != msg.sender) {
            revert("Character not owned by sender");
        }
        DungeonProgress memory progress = _dungeonProgress[characterId];
        if (progress.encounterCount == 0) {
            revert("Character not in a dungeon");
        }
        bool invalidEncounterId = true;
        for (uint256 i = 0; i < progress.encounterIndexes.length; i++) {
            if (progress.encounterIndexes[i] == encounterIndex) {
                invalidEncounterId = false;
                break;
            }
        }
        if (invalidEncounterId) {
            revert("Invalid encounter index");
        }

        Dungeon memory dungeon = _dungeons[progress.dungeonId];

        if (progress.encounterCount == dungeon.totalEncounters) {
            // Dungeon finished
            encounterIndexes = new uint256[](0);
        } else {
            // Dungeon continued
            encounterIndexes = _rollEncounters(dungeon, characterId);
        }

        if (encounterIndex == 0) {
            // Rest
            uint256 prevHp = progress.character.hp;
            uint256 newHp = Math.min(
                progress.character.stats.maxHp,
                progress.character.hp + 10
            );

            _dungeonProgress[characterId].character.hp = newHp;

            emit DungeonRest(
                characterId,
                prevHp,
                newHp,
                encounterIndexes
            );
        } else if (encounterIndex < dungeon.monsterEncounters.length + 1) {
            // Monster
            //uint256 index = encounterId - 1;
            // TODO: Deal with player death or monster defeat
        } else {
            // Item
            uint256 index = encounterIndex - dungeon.monsterEncounters.length - 1;

            Item20(_itemAddresses[dungeon.itemEncounters[index].itemId]).mint(
                character721.ownerOf(characterId),
                1 ether
            );

            character721.gainExp(characterId, 1);

            emit DungeonItem(
                characterId,
                _itemAddresses[dungeon.itemEncounters[index].itemId],
                dungeon.itemEncounters[index].itemId,
                1,
                encounterIndexes
            );
        }

        if (progress.encounterCount == dungeon.totalEncounters) {
            // Dungeon finished
            delete _dungeonProgress[characterId];
        } else {
            // Dungeon continued
            _dungeonProgress[characterId].encounterIndexes = encounterIndexes;
            _dungeonProgress[characterId].encounterCount++;
        }
    }

    function _createItem(
        bytes32 itemId,
        string memory name,
        string memory symbol,
        ItemData memory data
    ) internal returns (address item) {
        item = Clones.clone(address(item20Implementation));
        Item20(item).initialize(name, symbol);

        _itemData[itemId].itemType = data.itemType;
        for (uint256 i = 0; i < data.effects.length; i++) {
            _itemData[itemId].effects.push(data.effects[i]);
        }
        _itemAddresses[itemId] = item;

        emit ItemCreated(item, itemId, name, symbol);
    }

    function _rollEncounters(
        Dungeon memory dungeon,
        uint256 characterId
    ) internal view returns (uint256[] memory encounterIds) {
        // Terrible pseudo-random number generation in this function
        // Easily abused by reverting on unfavorable results, good enough for hackathon
        uint256 sudoRandom = uint256(
            keccak256(
                abi.encodePacked(block.number, block.prevrandao, characterId)
            )
        );
        encounterIds = new uint256[](3);
        for (uint256 i = 0; i < 3; i++) {
            uint256 typeSum = dungeon.restChance +
                dungeon.monsterChance +
                dungeon.itemChance;
            uint256 typeRoll = sudoRandom % typeSum;

            if (typeRoll < dungeon.restChance) {
                // Rest
                encounterIds[i] = 0;
            } else if (
                typeRoll < dungeon.restChance + dungeon.monsterChance &&
                dungeon.monsterEncounters.length > 0
            ) {
                // Monster
                sudoRandom = uint256(keccak256(abi.encodePacked(sudoRandom)));
                uint256 sum;
                for (uint256 j = 0; j < dungeon.monsterEncounters.length; j++) {
                    sum += dungeon.monsterEncounters[j].chance;
                }
                uint256 roll = sudoRandom % sum;
                uint256 cumulative;
                for (uint256 j = 0; j < dungeon.monsterEncounters.length; j++) {
                    cumulative += dungeon.monsterEncounters[j].chance;
                    if (roll < cumulative) {
                        // +1 to offset the rest encounter
                        encounterIds[i] = j + 1;
                        break;
                    }
                }
            } else {
                // Item
                sudoRandom = uint256(keccak256(abi.encodePacked(sudoRandom)));
                uint256 sum;
                for (uint256 j = 0; j < dungeon.itemEncounters.length; j++) {
                    sum += dungeon.itemEncounters[j].chance;
                }
                uint256 roll = sudoRandom % sum;
                uint256 cumulative;
                for (uint256 j = 0; j < dungeon.itemEncounters.length; j++) {
                    cumulative += dungeon.itemEncounters[j].chance;
                    if (roll < cumulative) {
                        // Offset the rest and monster encounters
                        encounterIds[i] =
                            j +
                            dungeon.monsterEncounters.length +
                            1;
                        break;
                    }
                }
            }

            sudoRandom = uint256(keccak256(abi.encodePacked(sudoRandom)));
        }
    }

    function _resolveMonsterEncounter(
        Actor memory character,
        bytes32[] memory itemIds,
        Monster memory monster
    ) internal view returns (Actor memory, MonsterResolution) {
        // Armor is a per-battle depletable shield that resets each fight, so it
        // lives on the Combatant rather than mutating the persistent stat.
        Combatant memory char = Combatant({
            actor: character,
            armor: character.stats.armor,
            hadArmor: character.stats.armor > 0,
            status: Status({poison: 0, acid: 0, stun: 0}),
            wounded: false,
            exposed: false,
            itemIds: itemIds,
            effects: new Effect[](0)
        });
        Combatant memory mob = Combatant({
            actor: monster.actor,
            armor: monster.actor.stats.armor,
            hadArmor: monster.actor.stats.armor > 0,
            status: Status({poison: 0, acid: 0, stun: 0}),
            wounded: false,
            exposed: false,
            itemIds: new bytes32[](0),
            effects: monster.effects
        });

        // BATTLE_START effects resolve once, in speed order: higher speed first,
        // ties favor the monster. Short-circuit if someone dies mid-trigger.
        {
            bool dead;
            if (char.actor.stats.speed > mob.actor.stats.speed) {
                dead = _applyTriggeredEffects(
                    char,
                    mob,
                    EffectTrigger.BATTLE_START
                );
                if (!dead)
                    dead = _applyTriggeredEffects(
                        mob,
                        char,
                        EffectTrigger.BATTLE_START
                    );
            } else {
                dead = _applyTriggeredEffects(
                    mob,
                    char,
                    EffectTrigger.BATTLE_START
                );
                if (!dead)
                    dead = _applyTriggeredEffects(
                        char,
                        mob,
                        EffectTrigger.BATTLE_START
                    );
            }
            if (dead) {
                if (char.actor.hp == 0)
                    return (char.actor, MonsterResolution.CHARACTER_DEATH);
                return (char.actor, MonsterResolution.MONSTER_DEATH);
            }
        }

        for (uint256 round = 0; round < 25; round++) {
            // Turn order is re-evaluated each round so mid-battle SPEED changes
            // take effect: higher speed acts first, ties favor the monster.
            bool characterFirst = char.actor.stats.speed >
                mob.actor.stats.speed;

            if (characterFirst) {
                if (_takeTurn(char, mob)) {
                    if (mob.actor.hp == 0)
                        return (char.actor, MonsterResolution.MONSTER_DEATH);
                    return (char.actor, MonsterResolution.CHARACTER_DEATH);
                }
                if (_takeTurn(mob, char)) {
                    if (char.actor.hp == 0)
                        return (char.actor, MonsterResolution.CHARACTER_DEATH);
                    return (char.actor, MonsterResolution.MONSTER_DEATH);
                }
            } else {
                if (_takeTurn(mob, char)) {
                    if (char.actor.hp == 0)
                        return (char.actor, MonsterResolution.CHARACTER_DEATH);
                    return (char.actor, MonsterResolution.MONSTER_DEATH);
                }
                if (_takeTurn(char, mob)) {
                    if (mob.actor.hp == 0)
                        return (char.actor, MonsterResolution.MONSTER_DEATH);
                    return (char.actor, MonsterResolution.CHARACTER_DEATH);
                }
            }
        }

        // 25-round cap reached: the monster flees and the character survives with
        // whatever HP they have left.
        return (char.actor, MonsterResolution.FLED);
    }

    function _takeTurn(
        Combatant memory self,
        Combatant memory other
    ) internal view returns (bool) {
        // ACID damages armor, if it has any, and is resolved before TURN_START.
        // It does not reduce over time.
        if (self.status.acid > 0 && self.armor > 0) {
            if (self.status.acid > self.armor) {
                self.armor = 0;
            } else {
                self.armor -= self.status.acid;
            }
        }

        // POISON damages HP, if armor is 0, and is resolved before TURN_START.
        // It reduces 1 stack per turn.
        if (self.status.poison > 0) {
            if (self.armor == 0) {
                _dealDamage(self, self.status.poison);
                if (self.actor.hp == 0) return true;
            }

            self.status.poison--;
        }

        // A stunned actor skips their entire turn: no WOUNDED/EXPOSED checks, no
        // TURN_START, and no attack. Each skipped turn consumes one stack of STUN.
        if (self.status.stun > 0) {
            self.status.stun--;
            return false;
        }

        // WOUNDED and EXPOSED are evaluated at the start of the actor's own turn
        // (from damage dealt since their last turn), before TURN_START. Each fires
        // at most once per actor.
        if (_checkWounded(self, other)) return true;
        if (_checkExposed(self, other)) return true;

        return _applyTriggeredEffects(self, other, EffectTrigger.TURN_START);
    }

    function _checkWounded(
        Combatant memory self,
        Combatant memory other
    ) internal view returns (bool) {
        if (self.wounded || self.actor.hp > self.actor.stats.maxHp / 2) {
            return false;
        }
        self.wounded = true;
        return _applyTriggeredEffects(self, other, EffectTrigger.WOUNDED);
    }

    function _checkExposed(
        Combatant memory self,
        Combatant memory other
    ) internal view returns (bool) {
        if (self.exposed || self.armor > 0 || !self.hadArmor) {
            return false;
        }
        self.exposed = true;
        return _applyTriggeredEffects(self, other, EffectTrigger.EXPOSED);
    }

    // Iterates self's effect sources for a trigger: innate effects, non-weapon items, then weapon.
    // Returns true if either combatant's HP hit 0 (caller inspects HP to determine who).
    function _applyTriggeredEffects(
        Combatant memory self,
        Combatant memory other,
        EffectTrigger trigger
    ) internal view returns (bool) {
        for (uint256 i = 0; i < self.effects.length; i++) {
            if (self.effects[i].effectTrigger == trigger) {
                _applyEffect(self, other, self.effects[i], false);
                if (self.actor.hp == 0 || other.actor.hp == 0) return true;
            }
        }
        for (uint256 k = 1; k < self.itemIds.length; k++) {
            if (
                _applyItemTriggeredEffects(
                    self.itemIds[k],
                    false,
                    self,
                    other,
                    trigger
                )
            ) return true;
        }
        if (self.itemIds.length > 0) {
            return
                _applyItemTriggeredEffects(
                    self.itemIds[0],
                    true,
                    self,
                    other,
                    trigger
                );
        }
        return false;
    }

    function _applyItemTriggeredEffects(
        bytes32 itemId,
        bool isWeapon,
        Combatant memory self,
        Combatant memory other,
        EffectTrigger trigger
    ) internal view returns (bool) {
        Effect[] memory effects = _itemData[itemId].effects;
        for (uint256 i = 0; i < effects.length; i++) {
            if (effects[i].effectTrigger == trigger) {
                _applyEffect(self, other, effects[i], isWeapon);
                if (self.actor.hp == 0 || other.actor.hp == 0) return true;
            }
        }
        return false;
    }

    function _applyEffect(
        Combatant memory self,
        Combatant memory other,
        Effect memory effect,
        bool isWeapon
    ) internal pure {
        // Always pass the target as a function arg so mutations apply to the
        // original Combatant (a local `target = cond ? self : other` is unsafe).
        if (effect.effectType == EffectType.DAMAGE) {
            if (effect.value == 0) {
                return;
            }
            uint256 damage = effect.value;
            // Basic attacks add the attack stat to the damage.
            if (isWeapon && effect.effectTrigger == EffectTrigger.TURN_START) {
                damage += self.actor.stats.attack;
            }
            _dealDamage(effect.self ? self : other, damage);
        } else if (effect.effectType == EffectType.HEAL) {
            _heal(effect.self ? self : other, effect.value);
        } else if (effect.effectType == EffectType.ARMOR) {
            _addArmor(effect.self ? self : other, effect.value);
        } else if (effect.effectType == EffectType.POISON) {
            (effect.self ? self : other).status.poison += effect.value;
        } else if (effect.effectType == EffectType.ACID) {
            (effect.self ? self : other).status.acid += effect.value;
        } else if (effect.effectType == EffectType.STUN) {
            (effect.self ? self : other).status.stun += effect.value;
        } else if (effect.effectType == EffectType.MAX_HP) {
            (effect.self ? self : other).actor.stats.maxHp += effect.value;
        } else if (effect.effectType == EffectType.ATTACK) {
            (effect.self ? self : other).actor.stats.attack += effect.value;
        } else if (effect.effectType == EffectType.SPEED) {
            (effect.self ? self : other).actor.stats.speed += effect.value;
        }
    }

    function _heal(Combatant memory target, uint256 value) internal pure {
        target.actor.hp = Math.min(
            target.actor.stats.maxHp,
            target.actor.hp + value
        );
    }

    function _addArmor(Combatant memory target, uint256 value) internal pure {
        // Adds to the per-battle armor pool, not the persistent stat.
        target.armor += value;
        target.hadArmor = true;
    }

    function _applyPassiveStats(
        Actor memory actor,
        bytes32[] memory itemIds
    ) internal view returns (Actor memory) {
        // PASSIVE effects are assumed to be stat increases only.
        for (uint256 k = 0; k < itemIds.length; k++) {
            Effect[] memory effects = _itemData[itemIds[k]].effects;
            for (uint256 i = 0; i < effects.length; i++) {
                Effect memory effect = effects[i];
                if (
                    effect.effectTrigger != EffectTrigger.PASSIVE ||
                    effect.value == 0
                ) {
                    continue;
                }

                if (effect.effectType == EffectType.MAX_HP) {
                    // Raise the pool and current HP together so the run starts full.
                    actor.stats.maxHp += effect.value;
                    actor.hp += effect.value;
                } else if (effect.effectType == EffectType.ARMOR) {
                    actor.stats.armor += effect.value;
                } else if (effect.effectType == EffectType.ATTACK) {
                    actor.stats.attack += effect.value;
                } else if (effect.effectType == EffectType.SPEED) {
                    actor.stats.speed += effect.value;
                }
            }
        }
        return actor;
    }

    function _dealDamage(
        Combatant memory defender,
        uint256 damage
    ) internal pure {
        // Damage only mutates HP/armor here. WOUNDED/EXPOSED are evaluated later,
        // at the start of the defender's own turn (see _takeTurn).
        (defender.actor.hp, defender.armor) = _applyDamage(
            defender.actor.hp,
            defender.armor,
            damage
        );
    }

    function _applyDamage(
        uint256 hp,
        uint256 armor,
        uint256 damage
    ) internal pure returns (uint256 newHp, uint256 newArmor) {
        if (damage <= armor) {
            return (hp, armor - damage);
        }

        // Armor fully absorbed; overflow spills onto HP. EXPOSED is detected at the
        // start of the actor's turn once armor has reached 0 (see _checkExposed).
        damage -= armor;
        newArmor = 0;
        newHp = damage >= hp ? 0 : hp - damage;
    }
}
