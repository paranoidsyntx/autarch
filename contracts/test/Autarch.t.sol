// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test} from "forge-std/Test.sol";
import {Autarch} from "../src/Autarch.sol";
import {Character721} from "../src/Character721.sol";
import {Item20} from "../src/Item20.sol";

contract AutarchTest is Test {
    Autarch autarch;
    Character721 character721;
    address player = makeAddr("player");

    function setUp() public {
        autarch = new Autarch();
        character721 = autarch.character721();

        _createItems();
        _createWeapons();
        _createMonsters();
        _createDungeons();
        _setStartingItems();
    }

    function test_fullDungeonFlow() public {
        vm.startPrank(player);
        uint256 charId = autarch.mintCharacter("Severian", 0);
        assertEq(character721.ownerOf(charId), player);

        assertGe(
            Item20(autarch.getItemAddress(bytes32("aGOLD"))).balanceOf(player),
            10 ether
        );
        assertGe(
            Item20(autarch.getItemAddress(bytes32("aWITHEREDAVERN"))).balanceOf(player),
            1 ether
        );

        bytes32[] memory equip = new bytes32[](2);
        equip[0] = bytes32("aWITHEREDAVERN");
        equip[1] = bytes32("aOSHERLSMERCY");

        uint256[] memory encounters = autarch.startDungeon(
            bytes32("aSAFEDUNGEON"),
            charId,
            equip
        );
        assertEq(encounters.length, 3);

        for (uint256 i = 0; i < 3; i++) {
            vm.roll(block.number + 1);
            encounters = autarch.continueDungeon(charId, encounters[0]);
        }

        vm.expectRevert("Character not in a dungeon");
        autarch.continueDungeon(charId, 0);

        equip = new bytes32[](2);
        equip[0] = bytes32("aWITHEREDAVERN");
        equip[1] = bytes32("aOSHERLSMERCY");

        vm.roll(block.number + 1);
        encounters = autarch.startDungeon(
            bytes32("aCOMBATDUNGEON"),
            charId,
            equip
        );
        assertEq(encounters.length, 3);

        for (uint256 i = 0; i < 2; i++) {
            vm.roll(block.number + 1);
            try autarch.continueDungeon(charId, encounters[0]) returns (
                uint256[] memory next
            ) {
                encounters = next;
            } catch {
                break;
            }
        }

        vm.stopPrank();
    }

    function test_cannotStartDungeonWhileInOne() public {
        vm.startPrank(player);
        uint256 charId = autarch.mintCharacter("Severian", 0);

        bytes32[] memory equip = new bytes32[](1);
        equip[0] = bytes32("aWITHEREDAVERN");

        autarch.startDungeon(bytes32("aSAFEDUNGEON"), charId, equip);

        vm.expectRevert("Character already in a dungeon");
        autarch.startDungeon(bytes32("aSAFEDUNGEON"), charId, equip);
        vm.stopPrank();
    }

    function test_cannotStartWithoutWeapon() public {
        vm.startPrank(player);
        uint256 charId = autarch.mintCharacter("Severian", 0);

        bytes32[] memory equip = new bytes32[](1);
        equip[0] = bytes32("aOSHERLSMERCY");

        vm.expectRevert("First item must be a weapon, other items must be items");
        autarch.startDungeon(bytes32("aSAFEDUNGEON"), charId, equip);
        vm.stopPrank();
    }

    function test_cannotStartWithNoItems() public {
        vm.startPrank(player);
        uint256 charId = autarch.mintCharacter("Severian", 0);

        bytes32[] memory equip = new bytes32[](0);
        vm.expectRevert("Must at least equip a weapon");
        autarch.startDungeon(bytes32("aSAFEDUNGEON"), charId, equip);
        vm.stopPrank();
    }

    function test_invalidEncounterReverts() public {
        vm.startPrank(player);
        uint256 charId = autarch.mintCharacter("Severian", 0);

        bytes32[] memory equip = new bytes32[](1);
        equip[0] = bytes32("aWITHEREDAVERN");

        autarch.startDungeon(bytes32("aSAFEDUNGEON"), charId, equip);

        vm.expectRevert("Invalid encounter index");
        autarch.continueDungeon(charId, 999);
        vm.stopPrank();
    }

    function test_otherPlayerCannotControlCharacter() public {
        vm.prank(player);
        uint256 charId = autarch.mintCharacter("Severian", 0);

        bytes32[] memory equip = new bytes32[](1);
        equip[0] = bytes32("aWITHEREDAVERN");

        address attacker = makeAddr("attacker");
        vm.prank(attacker);
        vm.expectRevert("Character not owned by sender");
        autarch.startDungeon(bytes32("aSAFEDUNGEON"), charId, equip);
    }

    function test_secondDungeonWithNewItems() public {
        vm.startPrank(player);
        uint256 charId = autarch.mintCharacter("Severian", 0);

        bytes32[] memory equip = new bytes32[](1);
        equip[0] = bytes32("aWITHEREDAVERN");

        uint256[] memory encounters = autarch.startDungeon(
            bytes32("aSAFEDUNGEON"),
            charId,
            equip
        );

        for (uint256 i = 0; i < 3; i++) {
            vm.roll(block.number + 1);
            encounters = autarch.continueDungeon(charId, encounters[0]);
        }

        address fuliginAddr = autarch.getItemAddress(bytes32("aFULIGINCLOAK"));
        address iounAddr = autarch.getItemAddress(bytes32("aIOUNSTONE"));

        bytes32[] memory equip2;
        if (Item20(fuliginAddr).balanceOf(player) >= 1 ether) {
            equip2 = new bytes32[](2);
            equip2[0] = bytes32("aWITHEREDAVERN");
            equip2[1] = bytes32("aFULIGINCLOAK");
        } else if (Item20(iounAddr).balanceOf(player) >= 1 ether) {
            equip2 = new bytes32[](2);
            equip2[0] = bytes32("aWITHEREDAVERN");
            equip2[1] = bytes32("aIOUNSTONE");
        } else {
            equip2 = new bytes32[](1);
            equip2[0] = bytes32("aWITHEREDAVERN");
        }

        vm.roll(block.number + 1);
        encounters = autarch.startDungeon(
            bytes32("aSAFEDUNGEON"),
            charId,
            equip2
        );
        assertEq(encounters.length, 3);

        for (uint256 i = 0; i < 3; i++) {
            vm.roll(block.number + 1);
            encounters = autarch.continueDungeon(charId, encounters[0]);
        }

        vm.stopPrank();
    }

    function test_playerDeath() public {
        vm.startPrank(player);
        uint256 charId = autarch.mintCharacter("Severian", 0);

        bytes32[] memory equip = new bytes32[](1);
        equip[0] = bytes32("aWITHEREDAVERN");

        uint256[] memory encounters = autarch.startDungeon(
            bytes32("aDEATHDUNGEON"),
            charId,
            equip
        );

        vm.roll(block.number + 1);
        uint256[] memory result = autarch.continueDungeon(charId, encounters[0]);

        assertEq(result.length, 0, "Dead character should get no next encounters");

        vm.roll(block.number + 1);
        encounters = autarch.startDungeon(
            bytes32("aSAFEDUNGEON"),
            charId,
            equip
        );
        assertEq(encounters.length, 3, "Should be able to start a new dungeon after death");

        vm.stopPrank();
    }

    function test_realDungeonVennelenGlades() public {
        vm.startPrank(player);
        uint256 charId = autarch.mintCharacter("Severian", 0);

        bytes32[] memory equip = new bytes32[](2);
        equip[0] = bytes32("aWITHEREDAVERN");
        equip[1] = bytes32("aOSHERLSMERCY");

        vm.roll(block.number + 1);
        uint256[] memory encounters = autarch.startDungeon(
            bytes32("aVENNELENGLADES"),
            charId,
            equip
        );
        assertEq(encounters.length, 3);

        for (uint256 i = 0; i < 4; i++) {
            vm.roll(block.number + 1);
            encounters = autarch.continueDungeon(charId, encounters[0]);
            if (encounters.length == 0) break;
        }

        vm.stopPrank();
    }

    function test_realDungeonMinesOfSaltus() public {
        vm.startPrank(player);
        uint256 charId = autarch.mintCharacter("Severian", 0);

        bytes32[] memory equip = new bytes32[](2);
        equip[0] = bytes32("aWITHEREDAVERN");
        equip[1] = bytes32("aOSHERLSMERCY");

        vm.roll(block.number + 1);
        uint256[] memory encounters = autarch.startDungeon(
            bytes32("aMINESOFSALTUS"),
            charId,
            equip
        );
        assertEq(encounters.length, 3);

        for (uint256 i = 0; i < 5; i++) {
            vm.roll(block.number + 1);
            encounters = autarch.continueDungeon(charId, encounters[0]);
            if (encounters.length == 0) break;
        }

        vm.stopPrank();
    }

    function test_realDungeonIucounusManse() public {
        vm.startPrank(player);
        uint256 charId = autarch.mintCharacter("Severian", 0);

        bytes32[] memory equip = new bytes32[](2);
        equip[0] = bytes32("aWITHEREDAVERN");
        equip[1] = bytes32("aOSHERLSMERCY");

        vm.roll(block.number + 1);
        uint256[] memory encounters = autarch.startDungeon(
            bytes32("aIUCNOUNSMANSE"),
            charId,
            equip
        );
        assertEq(encounters.length, 3);

        for (uint256 i = 0; i < 5; i++) {
            vm.roll(block.number + 1);
            encounters = autarch.continueDungeon(charId, encounters[0]);
            if (encounters.length == 0) break;
        }

        vm.stopPrank();
    }

    // ---- Setup helpers (full Deploy.s.sol content + test-only additions) ----

    function _setStartingItems() internal {
        Autarch.StartingItem[] memory items = new Autarch.StartingItem[](3);
        items[0] = Autarch.StartingItem({itemId: bytes32("aGOLD"), amount: 10 ether});
        items[1] = Autarch.StartingItem({itemId: bytes32("aOSHERLSMERCY"), amount: 1 ether});
        items[2] = Autarch.StartingItem({itemId: bytes32("aWITHEREDAVERN"), amount: 1 ether});
        autarch.setStartingItems(items);
    }

    function _createItems() internal {
        Autarch.Effect[] memory effects;

        // Gold
        autarch.createItem("Gold", "aGOLD", Autarch.ItemData({
            itemType: Autarch.ItemType.ITEM,
            effects: new Autarch.Effect[](0)
        }));

        // Osherl's Mercy
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.WOUNDED,
            effectType: Autarch.EffectType.HEAL,
            value: 4,
            self: true
        });
        autarch.createItem("Osherl's Mercy", "aOSHERLSMERCY", Autarch.ItemData({
            itemType: Autarch.ItemType.ITEM,
            effects: effects
        }));

        // Mazirian's Boots
        effects = new Autarch.Effect[](2);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.PASSIVE,
            effectType: Autarch.EffectType.SPEED,
            value: 6,
            self: true
        });
        effects[1] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.TURN_START,
            effectType: Autarch.EffectType.DAMAGE,
            value: 1,
            self: true
        });
        autarch.createItem("Mazirian's Boots", "aMAZIRIANSBOOTS", Autarch.ItemData({
            itemType: Autarch.ItemType.ITEM,
            effects: effects
        }));

        // IOUN Stone
        effects = new Autarch.Effect[](3);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.PASSIVE,
            effectType: Autarch.EffectType.ARMOR,
            value: 1,
            self: true
        });
        effects[1] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.PASSIVE,
            effectType: Autarch.EffectType.ATTACK,
            value: 1,
            self: true
        });
        effects[2] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.PASSIVE,
            effectType: Autarch.EffectType.SPEED,
            value: 1,
            self: true
        });
        autarch.createItem("IOUN Stone", "aIOUNSTONE", Autarch.ItemData({
            itemType: Autarch.ItemType.ITEM,
            effects: effects
        }));

        // Conciliator's Claw
        effects = new Autarch.Effect[](2);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.BATTLE_START,
            effectType: Autarch.EffectType.HEAL,
            value: 5,
            self: true
        });
        effects[1] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.WOUNDED,
            effectType: Autarch.EffectType.HEAL,
            value: 5,
            self: true
        });
        autarch.createItem("Conciliator's Claw", "aCONCILIATORSCLAW", Autarch.ItemData({
            itemType: Autarch.ItemType.ITEM,
            effects: effects
        }));

        // Fuligin Cloak
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.PASSIVE,
            effectType: Autarch.EffectType.SPEED,
            value: 2,
            self: true
        });
        autarch.createItem("Fuligin Cloak", "aFULIGINCLOAK", Autarch.ItemData({
            itemType: Autarch.ItemType.ITEM,
            effects: effects
        }));

        // Prismatic Spray
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.BATTLE_START,
            effectType: Autarch.EffectType.DAMAGE,
            value: 3,
            self: false
        });
        autarch.createItem("Prismatic Spray", "aPRISMATICSPRAY", Autarch.ItemData({
            itemType: Autarch.ItemType.ITEM,
            effects: effects
        }));

        // Baldanders' Serum
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.PASSIVE,
            effectType: Autarch.EffectType.MAX_HP,
            value: 7,
            self: true
        });
        autarch.createItem("Baldanders' Serum", "aBALDANDERSSERUM", Autarch.ItemData({
            itemType: Autarch.ItemType.ITEM,
            effects: effects
        }));

        // Sarsem's Ward
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.EXPOSED,
            effectType: Autarch.EffectType.ARMOR,
            value: 5,
            self: true
        });
        autarch.createItem("Sarsem's Ward", "aSARSEMSWARD", Autarch.ItemData({
            itemType: Autarch.ItemType.ITEM,
            effects: effects
        }));

        // Scale of Sadlark
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.PASSIVE,
            effectType: Autarch.EffectType.ARMOR,
            value: 3,
            self: true
        });
        autarch.createItem("Scale of Sadlark", "aSCALEOFSADLARK", Autarch.ItemData({
            itemType: Autarch.ItemType.ITEM,
            effects: effects
        }));

        // Amulet of Atulos
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.WOUNDED,
            effectType: Autarch.EffectType.STUN,
            value: 2,
            self: false
        });
        autarch.createItem("Amulet of Atulos", "aAMULETOFATULOS", Autarch.ItemData({
            itemType: Autarch.ItemType.ITEM,
            effects: effects
        }));
    }

    function _createWeapons() internal {
        Autarch.Effect[] memory effects;

        // Withered Avern
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.TURN_START,
            effectType: Autarch.EffectType.DAMAGE,
            value: 1,
            self: false
        });
        autarch.createItem("Withered Avern", "aWITHEREDAVERN", Autarch.ItemData({
            itemType: Autarch.ItemType.WEAPON,
            effects: effects
        }));

        // Terminus Est
        effects = new Autarch.Effect[](2);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.PASSIVE,
            effectType: Autarch.EffectType.SPEED,
            value: 1,
            self: true
        });
        effects[1] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.TURN_START,
            effectType: Autarch.EffectType.DAMAGE,
            value: 4,
            self: false
        });
        autarch.createItem("Terminus Est", "aTERMINUSEST", Autarch.ItemData({
            itemType: Autarch.ItemType.WEAPON,
            effects: effects
        }));

        // Azoth
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.TURN_START,
            effectType: Autarch.EffectType.DAMAGE,
            value: 5,
            self: false
        });
        autarch.createItem("Azoth", "aAZOTH", Autarch.ItemData({
            itemType: Autarch.ItemType.WEAPON,
            effects: effects
        }));

        // Avern
        effects = new Autarch.Effect[](2);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.TURN_START,
            effectType: Autarch.EffectType.DAMAGE,
            value: 2,
            self: false
        });
        effects[1] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.TURN_START,
            effectType: Autarch.EffectType.POISON,
            value: 1,
            self: false
        });
        autarch.createItem("Avern", "aAVERN", Autarch.ItemData({
            itemType: Autarch.ItemType.WEAPON,
            effects: effects
        }));

        // Scythe of Hierax
        effects = new Autarch.Effect[](2);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.WOUNDED,
            effectType: Autarch.EffectType.ATTACK,
            value: 3,
            self: true
        });
        effects[1] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.TURN_START,
            effectType: Autarch.EffectType.DAMAGE,
            value: 2,
            self: false
        });
        autarch.createItem("Scythe of Hierax", "aSCYTHEOFHIERAX", Autarch.ItemData({
            itemType: Autarch.ItemType.WEAPON,
            effects: effects
        }));

        // Axe of Lundor
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.TURN_START,
            effectType: Autarch.EffectType.DAMAGE,
            value: 3,
            self: false
        });
        autarch.createItem("Axe of Lundor", "aAXEOFLUNDOR", Autarch.ItemData({
            itemType: Autarch.ItemType.WEAPON,
            effects: effects
        }));
    }

    function _createMonsters() internal {
        Autarch.Effect[] memory effects;

        // Big Choppa
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.TURN_START,
            effectType: Autarch.EffectType.DAMAGE,
            value: 4,
            self: false
        });
        autarch.createMonster(
            bytes32("aBIGCHOPPA"), 50,
            Autarch.Stats({maxHp: 6, armor: 2, attack: 0, speed: 0}),
            effects
        );

        // Alzabo
        effects = new Autarch.Effect[](2);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.WOUNDED,
            effectType: Autarch.EffectType.ATTACK,
            value: 3,
            self: true
        });
        effects[1] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.TURN_START,
            effectType: Autarch.EffectType.DAMAGE,
            value: 2,
            self: false
        });
        autarch.createMonster(
            bytes32("aALZABO"), 70,
            Autarch.Stats({maxHp: 6, armor: 0, attack: 0, speed: 4}),
            effects
        );

        // Salamander
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.TURN_START,
            effectType: Autarch.EffectType.DAMAGE,
            value: 4,
            self: false
        });
        autarch.createMonster(
            bytes32("aSALAMANDER"), 30,
            Autarch.Stats({maxHp: 3, armor: 0, attack: 0, speed: 2}),
            effects
        );

        // Deodand
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.TURN_START,
            effectType: Autarch.EffectType.DAMAGE,
            value: 2,
            self: false
        });
        autarch.createMonster(
            bytes32("aDEODAND"), 25,
            Autarch.Stats({maxHp: 4, armor: 0, attack: 0, speed: 1}),
            effects
        );

        // Man Ape
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.TURN_START,
            effectType: Autarch.EffectType.DAMAGE,
            value: 2,
            self: false
        });
        autarch.createMonster(
            bytes32("aMANAPE"), 15,
            Autarch.Stats({maxHp: 3, armor: 0, attack: 0, speed: 1}),
            effects
        );

        // Laughing Magician
        effects = new Autarch.Effect[](2);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.WOUNDED,
            effectType: Autarch.EffectType.STUN,
            value: 3,
            self: false
        });
        effects[1] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.TURN_START,
            effectType: Autarch.EffectType.DAMAGE,
            value: 2,
            self: false
        });
        autarch.createMonster(
            bytes32("aLAUGHINGMAGICIAN"), 100,
            Autarch.Stats({maxHp: 10, armor: 0, attack: 0, speed: 3}),
            effects
        );

        // --- Test-only ---

        // Behemoth (guaranteed one-shot kill)
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.TURN_START,
            effectType: Autarch.EffectType.DAMAGE,
            value: 100,
            self: false
        });
        autarch.createMonster(
            bytes32("aBEHEMOTH"), 0,
            Autarch.Stats({maxHp: 999, armor: 0, attack: 0, speed: 99}),
            effects
        );
    }

    function _createDungeons() internal {
        Autarch.MonsterEncounter[] memory monsterEncounters;
        Autarch.ItemEncounter[] memory itemEncounters;

        // --- Real dungeons from Deploy.s.sol ---

        // Vennelen Glades
        monsterEncounters = new Autarch.MonsterEncounter[](3);
        monsterEncounters[0] = Autarch.MonsterEncounter({chance: 550, monsterId: bytes32("aMANAPE")});
        monsterEncounters[1] = Autarch.MonsterEncounter({chance: 350, monsterId: bytes32("aDEODAND")});
        monsterEncounters[2] = Autarch.MonsterEncounter({chance: 100, monsterId: bytes32("aALZABO")});
        itemEncounters = new Autarch.ItemEncounter[](5);
        itemEncounters[0] = Autarch.ItemEncounter({chance: 100, itemId: bytes32("aFULIGINCLOAK")});
        itemEncounters[1] = Autarch.ItemEncounter({chance: 100, itemId: bytes32("aSARSEMSWARD")});
        itemEncounters[2] = Autarch.ItemEncounter({chance: 100, itemId: bytes32("aMAZIRIANSBOOTS")});
        itemEncounters[3] = Autarch.ItemEncounter({chance: 100, itemId: bytes32("aAXEOFLUNDOR")});
        itemEncounters[4] = Autarch.ItemEncounter({chance: 100, itemId: bytes32("aAVERN")});
        autarch.createDungeon(
            bytes32("aVENNELENGLADES"), 4,
            250, 600, 150,
            monsterEncounters, itemEncounters
        );

        // Mines of Saltus
        monsterEncounters = new Autarch.MonsterEncounter[](3);
        monsterEncounters[0] = Autarch.MonsterEncounter({chance: 300, monsterId: bytes32("aMANAPE")});
        monsterEncounters[1] = Autarch.MonsterEncounter({chance: 400, monsterId: bytes32("aDEODAND")});
        monsterEncounters[2] = Autarch.MonsterEncounter({chance: 300, monsterId: bytes32("aBIGCHOPPA")});
        itemEncounters = new Autarch.ItemEncounter[](4);
        itemEncounters[0] = Autarch.ItemEncounter({chance: 100, itemId: bytes32("aAMULETOFATULOS")});
        itemEncounters[1] = Autarch.ItemEncounter({chance: 100, itemId: bytes32("aCONCILIATORSCLAW")});
        itemEncounters[2] = Autarch.ItemEncounter({chance: 100, itemId: bytes32("aSCALEOFSADLARK")});
        itemEncounters[3] = Autarch.ItemEncounter({chance: 100, itemId: bytes32("aSCYTHEOFHIERAX")});
        autarch.createDungeon(
            bytes32("aMINESOFSALTUS"), 5,
            150, 600, 250,
            monsterEncounters, itemEncounters
        );

        // Iucounu's Manse
        monsterEncounters = new Autarch.MonsterEncounter[](2);
        monsterEncounters[0] = Autarch.MonsterEncounter({chance: 300, monsterId: bytes32("aLAUGHINGMAGICIAN")});
        monsterEncounters[1] = Autarch.MonsterEncounter({chance: 700, monsterId: bytes32("aSALAMANDER")});
        itemEncounters = new Autarch.ItemEncounter[](5);
        itemEncounters[0] = Autarch.ItemEncounter({chance: 100, itemId: bytes32("aPRISMATICSPRAY")});
        itemEncounters[1] = Autarch.ItemEncounter({chance: 100, itemId: bytes32("aIOUNSTONE")});
        itemEncounters[2] = Autarch.ItemEncounter({chance: 100, itemId: bytes32("aBALDANDERSSERUM")});
        itemEncounters[3] = Autarch.ItemEncounter({chance: 100, itemId: bytes32("aAZOTH")});
        itemEncounters[4] = Autarch.ItemEncounter({chance: 100, itemId: bytes32("aTERMINUSEST")});
        autarch.createDungeon(
            bytes32("aIUCNOUNSMANSE"), 5,
            200, 500, 300,
            monsterEncounters, itemEncounters
        );

        // --- Test-only dungeons ---

        // Safe dungeon — rest and items only (no monsters)
        monsterEncounters = new Autarch.MonsterEncounter[](0);
        itemEncounters = new Autarch.ItemEncounter[](2);
        itemEncounters[0] = Autarch.ItemEncounter({chance: 500, itemId: bytes32("aFULIGINCLOAK")});
        itemEncounters[1] = Autarch.ItemEncounter({chance: 500, itemId: bytes32("aIOUNSTONE")});
        autarch.createDungeon(
            bytes32("aSAFEDUNGEON"), 3,
            500, 0, 500,
            monsterEncounters, itemEncounters
        );

        // Combat dungeon — weak monsters only
        monsterEncounters = new Autarch.MonsterEncounter[](1);
        monsterEncounters[0] = Autarch.MonsterEncounter({chance: 1000, monsterId: bytes32("aMANAPE")});
        itemEncounters = new Autarch.ItemEncounter[](0);
        autarch.createDungeon(
            bytes32("aCOMBATDUNGEON"), 2,
            0, 1000, 0,
            monsterEncounters, itemEncounters
        );

        // Death dungeon — guaranteed kill on first encounter
        monsterEncounters = new Autarch.MonsterEncounter[](1);
        monsterEncounters[0] = Autarch.MonsterEncounter({chance: 1000, monsterId: bytes32("aBEHEMOTH")});
        itemEncounters = new Autarch.ItemEncounter[](0);
        autarch.createDungeon(
            bytes32("aDEATHDUNGEON"), 3,
            0, 1000, 0,
            monsterEncounters, itemEncounters
        );
    }
}
