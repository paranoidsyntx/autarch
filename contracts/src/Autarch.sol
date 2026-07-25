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
        string name,
        string symbol
    );

    event MonsterCreated(
        uint256 indexed monsterId,
        string name
    );

    event DungeonCreated(
        uint256 indexed dungeonId,
        string name,
        uint256 totalEncounters
    );

    event CharacterMinted(
        uint256 indexed tokenId,
        string name,
        uint256 classIndex
    );

    event DungeonStarted(
        uint256 indexed characterId,
        uint256 indexed dungeonId,
        uint256[] encounterIds
    );

    event DungeonRest(
        uint256 indexed characterId,
        uint256 encounterId,
        uint256 prevHp,
        uint256 newHp,
        uint256[] nextEncounterIds
    );

    event DungeonMonster(
        uint256 indexed characterId,
        uint256 encounterId,

        uint256[] nextEncounterIds
    );

    event DungeonItem(
        uint256 indexed characterId,
        uint256 encounterId,
        address indexed item,
        uint256[] nextEncounterIds
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
        string name;
        Actor actor;
        Effect[] effects;
    }

    struct Effect {
        EffectTrigger effectTrigger;
        EffectType effectType;
        int256 value;
        bool self;
    }

    struct Item {
        ItemType itemType;
        Effect[] effects;
    }

    struct StartingItem {
        address item;
        uint256 amount;
    }

    struct MonsterEncounter {
        uint256 chance;
        uint256 monsterId;
    }

    struct ItemEncounter {
        uint256 chance;
        address item;
    }

    struct Dungeon {
        string name;
        uint256 totalEncounters;
        uint256 restChance; 
        uint256 monsterChance;
        uint256 itemChance;
        MonsterEncounter[] monsterEncounters;
        ItemEncounter[] itemEncounters;
    }

    struct DungeonProgress {
        uint256 dungeonId;
        uint256[] encounterIds;
        uint256 encounterCount;
        Actor character;
        address[] items;
    }

    Character721 public character721;

    Item20 public item20Implementation;

    mapping(address item => Item) private _items;
    StartingItem[] private _startingItems;

    Monster[] private _monsters;

    Dungeon[] private _dungeons;
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
        Item memory data
    ) external returns (address) {
        return _createItem(name, symbol, data);
    }

    function createMonster(
        string memory name,
        Actor memory actor,
        Effect[] memory effects
    ) external returns (uint256 monsterId) {
        monsterId = _monsters.length;
        _monsters.push();
        
        Monster storage sMonster = _monsters[monsterId];
        sMonster.name = name;
        sMonster.actor = actor;
        for (uint256 i = 0; i < effects.length; i++) {
            sMonster.effects.push(effects[i]);
        }

        emit MonsterCreated(monsterId, name);
    }

    function createDungeon(
        string memory name,
        uint256 totalEncounters,
        uint256 restChance,
        uint256 monsterChance,
        uint256 itemChance,
        MonsterEncounter[] memory monsterEncounters,
        ItemEncounter[] memory itemEncounters
    ) external returns (uint256 dungeonId) {
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

        dungeonId = _dungeons.length;
        _dungeons.push();

        Dungeon storage sDungeon = _dungeons[dungeonId];
        sDungeon.name = name;
        sDungeon.totalEncounters = totalEncounters;
        sDungeon.restChance = restChance;
        sDungeon.monsterChance = monsterChance;
        sDungeon.itemChance = itemChance;
        for (uint256 i = 0; i < monsterEncounters.length; i++) {
            sDungeon.monsterEncounters.push(monsterEncounters[i]);
        }
        for (uint256 i = 0; i < itemEncounters.length; i++) {
            sDungeon.itemEncounters.push(itemEncounters[i]);
        }

        emit DungeonCreated(dungeonId, name, totalEncounters);
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
            Item20(_startingItems[i].item).mint(
                msg.sender,
                _startingItems[i].amount
            );
        }

        emit CharacterMinted(characterId, name, classIndex);
    }

    function startDungeon(
        uint256 dungeonId,
        uint256 characterId,
        address[] memory items
    ) external returns (uint256[] memory encounterIds) {
        if(_dungeonProgress[characterId].encounterCount > 0) {
            revert("Character already in a dungeon");
        }
        if(dungeonId >= _dungeons.length) {
            revert("Dungeon does not exist");
        }
        if(character721.ownerOf(characterId) != msg.sender) {
            revert("Character not owned by sender");
        }
        if(items.length == 0) {
            revert("Must at least equip a weapon");
        }
        for(uint256 i = 0; i < items.length; i++) {
            // Allows single item to be equipped multiple times, good enough for hackathon
            if(Item20(items[i]).balanceOf(msg.sender) < 1 ether) {    
                revert("Item not owned by sender");
            }
        }

        Dungeon memory dungeon = _dungeons[dungeonId];

        encounterIds = _rollEncounters(dungeon, characterId);

        _dungeonProgress[characterId] = DungeonProgress({
            dungeonId: dungeonId,
            encounterIds: encounterIds,
            encounterCount: 1,
            character: character721.getCharacter(characterId),
            items: items
        });

        emit DungeonStarted(characterId, dungeonId, encounterIds);
    }

    function continueDungeon(
        uint256 characterId,
        uint256 encounterId
    ) external returns (uint256[] memory encounterIds) {
        DungeonProgress memory progress = _dungeonProgress[characterId];
        if(progress.encounterCount == 0) {
            revert("Character not in a dungeon");
        }
        bool invalidEncounterId = true;
        for(uint256 i = 0; i < progress.encounterIds.length; i++) {
            if(progress.encounterIds[i] == encounterId) {
                invalidEncounterId = false;
                break;
            }
        }
        if(invalidEncounterId) {
            revert("Invalid encounter ID");
        }

        Dungeon memory dungeon = _dungeons[progress.dungeonId];

        if(progress.encounterCount == dungeon.totalEncounters) {
            // Dungeon finished
            encounterIds = new uint256[](0);
        } else {
            // Dungeon continued
            encounterIds = _rollEncounters(dungeon, characterId);
        }

        if(encounterId == 0) {
            // Rest
            uint256 prevHp = progress.character.hp;
            uint256 newHp = Math.min(
                progress.character.stats.maxHp,
                progress.character.hp + 10
            );

            _dungeonProgress[characterId].character.hp = newHp;

            emit DungeonRest(characterId, encounterId, prevHp, newHp, encounterIds);
        } else if(encounterId < dungeon.monsterEncounters.length + 1) {
            // Monster
            //uint256 index = encounterId - 1;

            // TODO: Deal with player death or monster defeat
        } else {
            // Item
            uint256 index = encounterId - dungeon.monsterEncounters.length - 1;

            Item20(dungeon.itemEncounters[index].item).mint(
                character721.ownerOf(characterId),
                1 ether
            );

            emit DungeonItem(characterId, encounterId, dungeon.itemEncounters[index].item, encounterIds);
        }

        if(progress.encounterCount == dungeon.totalEncounters) {
            // Dungeon finished
            delete _dungeonProgress[characterId];
        } else {
            // Dungeon continued
            _dungeonProgress[characterId].encounterIds = encounterIds;
            _dungeonProgress[characterId].encounterCount++;
        }
    }

    function _createItem(
        string memory name,
        string memory symbol,
        Item memory data
    ) internal returns (address item) {
        item = Clones.clone(address(item20Implementation));
        Item20(item).initialize(
            name,
            symbol
        );

        Item storage sItem = _items[item];
        sItem.itemType = data.itemType;
        for (uint256 i = 0; i < data.effects.length; i++) {
            sItem.effects.push(data.effects[i]);
        }

        emit ItemCreated(item, name, symbol);
    }

    function _rollEncounters(
        Dungeon memory dungeon,
        uint256 characterId
    ) internal view returns (uint256[] memory encounterIds) {
        // Terrible pseudo-random number generation in this function
        // Easily abused by reverting on unfavorable results, good enough for hackathon
        uint256 sudoRandom = uint256(keccak256(abi.encodePacked(block.number, block.prevrandao, characterId)));
        encounterIds = new uint256[](3);
        for(uint256 i = 0; i < 3; i++) {
            uint256 typeSum = dungeon.restChance + dungeon.monsterChance + dungeon.itemChance;
            uint256 typeRoll = sudoRandom % typeSum;

            if(typeRoll < dungeon.restChance) {
                // Rest
                encounterIds[i] = 0;
            } else if(typeRoll < dungeon.restChance + dungeon.monsterChance && dungeon.monsterEncounters.length > 0) {
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
                        encounterIds[i] = j + dungeon.monsterEncounters.length + 1;
                        break;
                    }
                }
            }

            sudoRandom = uint256(keccak256(abi.encodePacked(sudoRandom)));
        }
    }

    
}
