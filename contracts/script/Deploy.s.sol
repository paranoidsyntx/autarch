// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script, console2} from "forge-std/Script.sol";

import {Autarch} from "../src/Autarch.sol";

contract Deploy is Script {
    function run() public {
        vm.startBroadcast();

        Autarch autarch = new Autarch();

        /*
            Create items
            - Gold
            - Osherl's Mercy
            - Mazirian's Boots
            - IOUN Stone
            - Conciliator's Claw
            - Fuligin Cloak
            - Prismatic Spray
        */

        // Gold
        address gold = autarch.createItem("Gold", "aGOLD", Autarch.Item({
            itemType: Autarch.ItemType.ITEM,
            effects: new Autarch.Effect[](0)
        }));

        // Osherl's Mercy
        Autarch.Effect[] memory osherlsMercyEffects = new Autarch.Effect[](1);
        osherlsMercyEffects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.WOUNDED,
            effectType: Autarch.EffectType.HEAL,
            value: 4,
            self: true
        });
        address osherlsMercy = autarch.createItem("Osherl's Mercy", "aOSHERLSMERCY", Autarch.Item({
            itemType: Autarch.ItemType.ITEM,
            effects: osherlsMercyEffects
        }));

        // Mazirian's Boots
        Autarch.Effect[] memory maziriansBootsEffects = new Autarch.Effect[](2);
        maziriansBootsEffects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.TURN_START,
            effectType: Autarch.EffectType.SPEED,
            value: 1,
            self: true
        });
        maziriansBootsEffects[1] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.TURN_START,
            effectType: Autarch.EffectType.DAMAGE,
            value: 1,
            self: true
        });
        autarch.createItem("Mazirian's Boots", "aMAZIRIANSBOOTS", Autarch.Item({
            itemType: Autarch.ItemType.ITEM,
            effects: maziriansBootsEffects
        }));

        // IOUN Stone
        Autarch.Effect[] memory iounStoneEffects = new Autarch.Effect[](3);
        iounStoneEffects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.PASSIVE,
            effectType: Autarch.EffectType.ARMOR,
            value: 1,
            self: true
        });
        iounStoneEffects[1] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.PASSIVE,
            effectType: Autarch.EffectType.ATTACK,
            value: 1,
            self: true
        });
        iounStoneEffects[2] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.PASSIVE,
            effectType: Autarch.EffectType.SPEED,
            value: 1,
            self: true
        });
        autarch.createItem("IOUN Stone", "aIOUNSTONE", Autarch.Item({
            itemType: Autarch.ItemType.ITEM,
            effects: iounStoneEffects
        }));

        // Conciliator's Claw
        Autarch.Effect[] memory conciliatorsClawEffects = new Autarch.Effect[](2);
        conciliatorsClawEffects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.BATTLE_START,
            effectType: Autarch.EffectType.HEAL,
            value: 5,
            self: true
        });
        conciliatorsClawEffects[1] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.WOUNDED,
            effectType: Autarch.EffectType.HEAL,
            value: 5,
            self: true
        });
        autarch.createItem("Conciliator's Claw", "aCONCILIATORSCLAW", Autarch.Item({
            itemType: Autarch.ItemType.ITEM,
            effects: conciliatorsClawEffects
        }));

        // Fuligin Cloak
        Autarch.Effect[] memory fuliginCloakEffects = new Autarch.Effect[](1);
        fuliginCloakEffects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.PASSIVE,
            effectType: Autarch.EffectType.SPEED,
            value: 2,
            self: true
        });
        autarch.createItem("Fuligin Cloak", "aFULIGINCLOAK", Autarch.Item({
            itemType: Autarch.ItemType.ITEM,
            effects: fuliginCloakEffects
        }));

        // Prismatic Spray
        Autarch.Effect[] memory prismaticSprayEffects = new Autarch.Effect[](1);
        prismaticSprayEffects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.BATTLE_START,
            effectType: Autarch.EffectType.DAMAGE,
            value: 3,
            self: false
        });
        autarch.createItem("Prismatic Spray", "aPRISMATICSPRAY", Autarch.Item({
            itemType: Autarch.ItemType.ITEM,
            effects: prismaticSprayEffects
        }));

        /* 
            Create weapons
            - Withered Avern
            - Terminus Est
            - Azoth
        */

        // Withered Avern
        Autarch.Effect[] memory witheredAvernEffects = new Autarch.Effect[](1);
        witheredAvernEffects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.TURN_START,
            effectType: Autarch.EffectType.DAMAGE,
            value: 1,
            self: false
        });
        address witheredAvern = autarch.createItem("Withered Avern", "aWITHEREDAVERN", Autarch.Item({
            itemType: Autarch.ItemType.WEAPON,
            effects: witheredAvernEffects
        }));

        // Terminus Est
        Autarch.Effect[] memory terminusEstEffects = new Autarch.Effect[](2);
        terminusEstEffects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.TURN_START,
            effectType: Autarch.EffectType.DAMAGE,
            value: 4,
            self: false
        });
        terminusEstEffects[1] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.PASSIVE,
            effectType: Autarch.EffectType.SPEED,
            value: 1,
            self: true
        });
        autarch.createItem("Terminus Est", "aTERMINUSEST", Autarch.Item({
            itemType: Autarch.ItemType.WEAPON,
            effects: terminusEstEffects
        }));

        // Azoth
        Autarch.Effect[] memory azothEffects = new Autarch.Effect[](1);
        azothEffects[0] = Autarch.Effect({
            effectTrigger: Autarch.EffectTrigger.TURN_START,
            effectType: Autarch.EffectType.DAMAGE,
            value: 5,
            self: false
        });
        autarch.createItem("Azoth", "aAZOTH", Autarch.Item({
            itemType: Autarch.ItemType.WEAPON,
            effects: azothEffects
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