// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script, console2} from "forge-std/Script.sol";

import {Autarch} from "../src/Autarch.sol";

contract Deploy is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        Autarch autarch = new Autarch();

        _createItems(autarch);
        _createWeapons(autarch);
        _createMonsters(autarch);
        _createDungeons(autarch);

        /*
            Set starting items
            - Gold (10)
            - Osherl's Mercy (1)
            - Withered Avern (1)
        */

        Autarch.StartingItem[]
            memory startingItems = new Autarch.StartingItem[](3);
        startingItems[0] = Autarch.StartingItem({
            itemId: bytes32("aGOLD"),
            amount: 10 ether
        });
        startingItems[1] = Autarch.StartingItem({
            itemId: bytes32("aOSHERLSMERCY"),
            amount: 1 ether
        });
        startingItems[2] = Autarch.StartingItem({
            itemId: bytes32("aWITHEREDAVERN"),
            amount: 1 ether
        });
        autarch.setStartingItems(startingItems);

        vm.stopBroadcast();

        console2.log("Autarch: ", address(autarch));
    }

    /*
        - Gold
        - Osherl's Mercy
        - Mazirian's Boots
        - IOUN Stone
        - Conciliator's Claw
        - Fuligin Cloak
        - Prismatic Spray
        - Baldanders' Serum
        - Scale of Sadlark
        - Sarsem's Ward
        - Amulet of Atulos
    */
    function _createItems(Autarch autarch) internal {
        Autarch.Effect[] memory effects;

        // Gold
        autarch.createItem(
            "Gold",
            "aGOLD",
            Autarch.ItemData({
                itemType: Autarch.ItemType.ITEM,
                effects: new Autarch.Effect[](0)
            })
        );

        // Osherl's Mercy
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.WOUNDED,
            effectType: Autarch.EffectType.HEAL,
            value: 4,
            self: true
        });
        autarch.createItem(
            "Osherl's Mercy",
            "aOSHERLSMERCY",
            Autarch.ItemData({
                itemType: Autarch.ItemType.ITEM,
                effects: effects
            })
        );

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
        autarch.createItem(
            "Mazirian's Boots",
            "aMAZIRIANSBOOTS",
            Autarch.ItemData({
                itemType: Autarch.ItemType.ITEM,
                effects: effects
            })
        );

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
        autarch.createItem(
            "IOUN Stone",
            "aIOUNSTONE",
            Autarch.ItemData({
                itemType: Autarch.ItemType.ITEM,
                effects: effects
            })
        );

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
        autarch.createItem(
            "Conciliator's Claw",
            "aCONCILIATORSCLAW",
            Autarch.ItemData({
                itemType: Autarch.ItemType.ITEM,
                effects: effects
            })
        );

        // Fuligin Cloak
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.PASSIVE,
            effectType: Autarch.EffectType.SPEED,
            value: 2,
            self: true
        });
        autarch.createItem(
            "Fuligin Cloak",
            "aFULIGINCLOAK",
            Autarch.ItemData({
                itemType: Autarch.ItemType.ITEM,
                effects: effects
            })
        );

        // Prismatic Spray
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.BATTLE_START,
            effectType: Autarch.EffectType.DAMAGE,
            value: 3,
            self: false
        });
        autarch.createItem(
            "Prismatic Spray",
            "aPRISMATICSPRAY",
            Autarch.ItemData({
                itemType: Autarch.ItemType.ITEM,
                effects: effects
            })
        );

        // Baldanders' Serum
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.PASSIVE,
            effectType: Autarch.EffectType.MAX_HP,
            value: 7,
            self: true
        });
        autarch.createItem(
            "Baldanders' Serum",
            "aBALDANDERSSERUM",
            Autarch.ItemData({
                itemType: Autarch.ItemType.ITEM,
                effects: effects
            })
        );

        // Sarsem's Ward
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.EXPOSED,
            effectType: Autarch.EffectType.ARMOR,
            value: 5,
            self: true
        });
        autarch.createItem(
            "Sarsem's Ward",
            "aSARSEMSWARD",
            Autarch.ItemData({
                itemType: Autarch.ItemType.ITEM,
                effects: effects
            })
        );

        // Scale of Sadlark
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.PASSIVE,
            effectType: Autarch.EffectType.ARMOR,
            value: 3,
            self: true
        });
        autarch.createItem(
            "Scale of Sadlark",
            "aSCALEOFSADLARK",
            Autarch.ItemData({
                itemType: Autarch.ItemType.ITEM,
                effects: effects
            })
        );

        // Amulet of Atulos
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.WOUNDED,
            effectType: Autarch.EffectType.STUN,
            value: 2,
            self: false
        });
        autarch.createItem(
            "Amulet of Atulos",
            "aAMULETOFATULOS",
            Autarch.ItemData({
                itemType: Autarch.ItemType.ITEM,
                effects: effects
            })
        );
    }

    /* 
        - Withered Avern
        - Terminus Est
        - Azoth
        - Avern
        - Scythe of Hierax
        - Axe of Lundor
    */
    function _createWeapons(Autarch autarch) internal {
        Autarch.Effect[] memory effects;

        // Withered Avern
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.TURN_START,
            effectType: Autarch.EffectType.DAMAGE,
            value: 1,
            self: false
        });
        autarch.createItem(
            "Withered Avern",
            "aWITHEREDAVERN",
            Autarch.ItemData({
                itemType: Autarch.ItemType.WEAPON,
                effects: effects
            })
        );

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
        autarch.createItem(
            "Terminus Est",
            "aTERMINUSEST",
            Autarch.ItemData({
                itemType: Autarch.ItemType.WEAPON,
                effects: effects
            })
        );

        // Azoth
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.TURN_START,
            effectType: Autarch.EffectType.DAMAGE,
            value: 5,
            self: false
        });
        autarch.createItem(
            "Azoth",
            "aAZOTH",
            Autarch.ItemData({
                itemType: Autarch.ItemType.WEAPON,
                effects: effects
            })
        );

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
        autarch.createItem(
            "Avern",
            "aAVERN",
            Autarch.ItemData({
                itemType: Autarch.ItemType.WEAPON,
                effects: effects
            })
        );

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
        autarch.createItem(
            "Scythe of Hierax",
            "aSCYTHEOFHIERAX",
            Autarch.ItemData({
                itemType: Autarch.ItemType.WEAPON,
                effects: effects
            })
        );

        // Axe of Lundor
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.TURN_START,
            effectType: Autarch.EffectType.DAMAGE,
            value: 3,
            self: false
        });
        autarch.createItem(
            "Axe of Lundor",
            "aAXEOFLUNDOR",
            Autarch.ItemData({
                itemType: Autarch.ItemType.WEAPON,
                effects: effects
            })
        );
    }

    /* 
        - Big Choppa
        - Alzabo
        - Salamander
        - Deodand
        - Man Ape
        - Laughing Magician
    */
    function _createMonsters(Autarch autarch) internal {
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
            "aBIGCHOPPA",
            50,
            Autarch.Stats({
                maxHp: 6,
                armor: 2,
                attack: 0,
                speed: 0
            }),
            effects
        );

        // Alzabo
        effects = new Autarch.Effect[](2);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.WOUNDED,
            effectType: Autarch.EffectType.HEAL,
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
            "aALZABO",
            70,
            Autarch.Stats({
                maxHp: 6,
                armor: 0,
                attack: 0,
                speed: 4
            }),
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
            "aSALAMANDER",
            30,
            Autarch.Stats({
                maxHp: 3,
                armor: 0,
                attack: 0,
                speed: 2
            }),
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
            "aDEODAND",
            25,
            Autarch.Stats({
                maxHp: 4,
                armor: 0,
                attack: 0,
                speed: 1
            }),
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
            "aMANAPE",
            15,
            Autarch.Stats({
                maxHp: 3,
                armor: 0,
                attack: 0,
                speed: 1
            }),
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
            "aLAUGHINGMAGICIAN",
            100,
            Autarch.Stats({
                maxHp: 10,
                armor: 0,
                attack: 0,
                speed: 3
            }),
            effects
        );
    }

    /*
        - Vennelen Glades
        - Mines of Saltus
        - Iucounu's Manse
    */
    function _createDungeons(Autarch autarch) internal {
        Autarch.MonsterEncounter[] memory monsterEncounters;
        Autarch.ItemEncounter[] memory itemEncounters;

        // Vennelen Glades
        // Monsters
        monsterEncounters = new Autarch.MonsterEncounter[](3);
        monsterEncounters[0] = Autarch.MonsterEncounter({
            chance: 550,
            monsterId: bytes32("aMANAPE")
        });
        monsterEncounters[1] = Autarch.MonsterEncounter({
            chance: 350,
            monsterId: bytes32("aDEODAND")
        });
        monsterEncounters[2] = Autarch.MonsterEncounter({
            chance: 100,
            monsterId: bytes32("aALZABO")
        });
        // Items
        itemEncounters = new Autarch.ItemEncounter[](5);
        itemEncounters[0] = Autarch.ItemEncounter({
            chance: 100,
            itemId: bytes32("aFULIGINCLOAK")
        });
        itemEncounters[1] = Autarch.ItemEncounter({
            chance: 100,
            itemId: bytes32("aSARSEMSWARD")
        });
        itemEncounters[2] = Autarch.ItemEncounter({
            chance: 100,
            itemId: bytes32("aMAZIRIANSBOOTS")
        });
        itemEncounters[3] = Autarch.ItemEncounter({
            chance: 100,
            itemId: bytes32("aAXEOFLUNDOR")
        });
        itemEncounters[4] = Autarch.ItemEncounter({
            chance: 100,
            itemId: bytes32("aAVERN")
        });
        autarch.createDungeon(
            bytes32("aVENNELENGLADES"),
            4,
            250,
            600,
            150,
            monsterEncounters,
            itemEncounters
        );

        // Mines of Saltus
        // Monsters
        monsterEncounters = new Autarch.MonsterEncounter[](3);
        monsterEncounters[0] = Autarch.MonsterEncounter({
            chance: 300,
            monsterId: bytes32("aMANAPE")
        });
        monsterEncounters[1] = Autarch.MonsterEncounter({
            chance: 400,
            monsterId: bytes32("aDEODAND")
        });
        monsterEncounters[2] = Autarch.MonsterEncounter({
            chance: 300,
            monsterId: bytes32("aBIGCHOPPA")
        });
        // Items
        itemEncounters = new Autarch.ItemEncounter[](4);
        itemEncounters[0] = Autarch.ItemEncounter({
            chance: 100,
            itemId: bytes32("aAMULETOFATULOS")
        });
        itemEncounters[1] = Autarch.ItemEncounter({
            chance: 100,
            itemId: bytes32("aCONCILIATORSCLAW")
        });
        itemEncounters[2] = Autarch.ItemEncounter({
            chance: 100,
            itemId: bytes32("aSCALEOFSADLARK")
        });
        itemEncounters[3] = Autarch.ItemEncounter({
            chance: 100,
            itemId: bytes32("aSCYTHEOFHIERAX")
        });
        autarch.createDungeon(
            bytes32("aMINESOFSALTUS"),
            5,
            150,
            600,
            250,
            monsterEncounters,
            itemEncounters
        );

        // Iucounu's Manse
        // Monsters
        monsterEncounters = new Autarch.MonsterEncounter[](2);
        monsterEncounters[0] = Autarch.MonsterEncounter({
            chance: 300,
            monsterId: bytes32("aLAUGHINGMAGICIAN")
        });
        monsterEncounters[1] = Autarch.MonsterEncounter({
            chance: 700,
            monsterId: bytes32("aSALAMANDER")
        });
        // Items
        itemEncounters = new Autarch.ItemEncounter[](5);
        itemEncounters[0] = Autarch.ItemEncounter({
            chance: 100,
            itemId: bytes32("aPRISMATICSPRAY")
        });
        itemEncounters[1] = Autarch.ItemEncounter({
            chance: 100,
            itemId: bytes32("aIOUNSTONE")
        });
        itemEncounters[2] = Autarch.ItemEncounter({
            chance: 100,
            itemId: bytes32("aBALDANDERSSERUM")
        });
        itemEncounters[3] = Autarch.ItemEncounter({
            chance: 100,
            itemId: bytes32("aAZOTH")
        });
        itemEncounters[4] = Autarch.ItemEncounter({
            chance: 100,
            itemId: bytes32("aTERMINUSEST")
        });
        autarch.createDungeon(
            bytes32("aIUCOUNUSMANSE"),
            5,
            200,
            500,
            300,
            monsterEncounters,
            itemEncounters
        );
    }
}
