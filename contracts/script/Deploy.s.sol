// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script, console2} from "forge-std/Script.sol";

import {Autarch} from "../src/Autarch.sol";

contract Deploy is Script {
    function run() public {
        vm.startBroadcast();

        Autarch autarch = new Autarch();

        Autarch.Effect[] memory effects;

        /*
            Create items
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
            - Ring of Atuloss
        */

        // Gold
        address gold = autarch.createItem("Gold", "aGOLD", Autarch.Item({
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
        address osherlsMercy = autarch.createItem("Osherl's Mercy", "aOSHERLSMERCY", Autarch.Item({
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
        autarch.createItem("Mazirian's Boots", "aMAZIRIANSBOOTS", Autarch.Item({
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
        autarch.createItem("IOUN Stone", "aIOUNSTONE", Autarch.Item({
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
        autarch.createItem("Conciliator's Claw", "aCONCILIATORSCLAW", Autarch.Item({
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
        autarch.createItem("Fuligin Cloak", "aFULIGINCLOAK", Autarch.Item({
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
        autarch.createItem("Prismatic Spray", "aPRISMATICSPRAY", Autarch.Item({
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
        autarch.createItem("Baldanders' Serum", "aBALDANDERSSErum", Autarch.Item({
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
        autarch.createItem("Sarsem's Ward", "aSARSEMSWARD", Autarch.Item({
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
        autarch.createItem("Scale of Sadlark", "aSCALEOFSADLARK", Autarch.Item({
            itemType: Autarch.ItemType.ITEM,
            effects: effects
        }));

        // Ring of Atuloss
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.PASSIVE,
            effectType: Autarch.EffectType.ATTACK,
            value: 1,
            self: true
        });
        autarch.createItem("Ring of Atuloss", "aRINGOFATULOSS", Autarch.Item({
            itemType: Autarch.ItemType.ITEM,
            effects: effects
        }));

        /* 
            Create weapons
            - Withered Avern
            - Terminus Est
            - Azoth
            - Avern
            - Scythe of Hierax
        */

        // Withered Avern
        effects = new Autarch.Effect[](1);
        effects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.TURN_START,
            effectType: Autarch.EffectType.DAMAGE,
            value: 1,
            self: false
        });
        address witheredAvern = autarch.createItem("Withered Avern", "aWITHEREDAVERN", Autarch.Item({
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
        autarch.createItem("Terminus Est", "aTERMINUSEST", Autarch.Item({
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
        autarch.createItem("Azoth", "aAZOTH", Autarch.Item({
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
        autarch.createItem("Avern", "aAVERN", Autarch.Item({
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
        autarch.createItem("Scythe of Hierax", "aSCYTHEOFHIERAX", Autarch.Item({
            itemType: Autarch.ItemType.WEAPON,
            effects: effects
        }));

        /*
            Set starting items
            - Gold (10)
            - Osherl's Mercy (1)
            - Withered Avern (1)
        */

        Autarch.StartingItem[] memory startingItems = new Autarch.StartingItem[](3);
        startingItems[0] = Autarch.StartingItem({
            item: address(gold),
            amount: 10 ether
        });
        startingItems[1] = Autarch.StartingItem({  
            item: address(osherlsMercy),
            amount: 1 ether
        });
        startingItems[2] = Autarch.StartingItem({
            item: address(witheredAvern),
            amount: 1 ether
        });
        autarch.setStartingItems(startingItems);

        vm.stopBroadcast();

        console2.log("Autarch: ", address(autarch));
    }
}