export enum ItemType {
    ITEM = "ITEM",
    WEAPON = "WEAPON",
}

export enum EffectTrigger {
    PASSIVE = "PASSIVE",
    TURN_START = "TURN_START",
    BATTLE_START = "BATTLE_START",
    WOUNDED = "WOUNDED",
    EXPOSED = "EXPOSED",
}

export enum EffectType {
    HEAL = "HEAL",
    DAMAGE = "DAMAGE",
    ARMOR = "ARMOR",
    ATTACK = "ATTACK",
    SPEED = "SPEED",
    MAX_HP = "MAX_HP",
    STUN = "STUN",
    POISON = "POISON",
}

export interface Effect {
    trigger: EffectTrigger;
    type: EffectType;
    value: number;
    self: boolean;
}

export interface Item {
    name: string;
    image: string;
    itemType: ItemType;
    effects: Effect[];
}

export const ITEMS: Record<string, Item> = {
    aGOLD: {
        name: "Gold",
        image: "/items/gold.png",
        itemType: ItemType.ITEM,
        effects: [],
    },
    aOSHERLSMERCY: {
        name: "Osherl's Mercy",
        image: "/items/osherls-mercy.png",
        itemType: ItemType.ITEM,
        effects: [
            { trigger: EffectTrigger.WOUNDED, type: EffectType.HEAL, value: 4, self: true },
        ],
    },
    aMAZIRIANSBOOTS: {
        name: "Mazirian's Boots",
        image: "/items/mazirians-boots.png",
        itemType: ItemType.ITEM,
        effects: [
            { trigger: EffectTrigger.PASSIVE, type: EffectType.SPEED, value: 6, self: true },
            { trigger: EffectTrigger.TURN_START, type: EffectType.DAMAGE, value: 1, self: true },
        ],
    },
    aIOUNSTONE: {
        name: "IOUN Stone",
        image: "/items/ioun-stone.png",
        itemType: ItemType.ITEM,
        effects: [
            { trigger: EffectTrigger.PASSIVE, type: EffectType.ARMOR, value: 1, self: true },
            { trigger: EffectTrigger.PASSIVE, type: EffectType.ATTACK, value: 1, self: true },
            { trigger: EffectTrigger.PASSIVE, type: EffectType.SPEED, value: 1, self: true },
        ],
    },
    aCONCILIATORSCLAW: {
        name: "Conciliator's Claw",
        image: "/items/conciliators-claw.png",
        itemType: ItemType.ITEM,
        effects: [
            { trigger: EffectTrigger.BATTLE_START, type: EffectType.HEAL, value: 5, self: true },
            { trigger: EffectTrigger.WOUNDED, type: EffectType.HEAL, value: 5, self: true },
        ],
    },
    aFULIGINCLOAK: {
        name: "Fuligin Cloak",
        image: "/items/fuligin-cloak.png",
        itemType: ItemType.ITEM,
        effects: [
            { trigger: EffectTrigger.PASSIVE, type: EffectType.SPEED, value: 2, self: true },
        ],
    },
    aPRISMATICSPRAY: {
        name: "Prismatic Spray",
        image: "/items/prismatic-spray.png",
        itemType: ItemType.ITEM,
        effects: [
            { trigger: EffectTrigger.BATTLE_START, type: EffectType.DAMAGE, value: 3, self: false },
        ],
    },
    aBALDANDERSSERUM: {
        name: "Baldanders' Serum",
        image: "/items/baldanders-serum.png",
        itemType: ItemType.ITEM,
        effects: [
            { trigger: EffectTrigger.PASSIVE, type: EffectType.MAX_HP, value: 7, self: true },
        ],
    },
    aSARSEMSWARD: {
        name: "Sarsem's Ward",
        image: "/items/sarsems-ward.png",
        itemType: ItemType.ITEM,
        effects: [
            { trigger: EffectTrigger.EXPOSED, type: EffectType.ARMOR, value: 5, self: true },
        ],
    },
    aSCALEOFSADLARK: {
        name: "Scale of Sadlark",
        image: "/items/scale-of-sadlark.png",
        itemType: ItemType.ITEM,
        effects: [
            { trigger: EffectTrigger.PASSIVE, type: EffectType.ARMOR, value: 3, self: true },
        ],
    },
    aAMULETOFATULOS: {
        name: "Amulet of Atulos",
        image: "/items/amulet-of-atulos.png",
        itemType: ItemType.ITEM,
        effects: [
            { trigger: EffectTrigger.WOUNDED, type: EffectType.STUN, value: 2, self: false },
        ],
    },
    aWITHEREDAVERN: {
        name: "Withered Avern",
        image: "/items/withered-avern.png",
        itemType: ItemType.WEAPON,
        effects: [
            { trigger: EffectTrigger.TURN_START, type: EffectType.DAMAGE, value: 1, self: false },
        ],
    },
    aTERMINUSEST: {
        name: "Terminus Est",
        image: "/items/terminus-est.png",
        itemType: ItemType.WEAPON,
        effects: [
            { trigger: EffectTrigger.PASSIVE, type: EffectType.SPEED, value: 1, self: true },
            { trigger: EffectTrigger.TURN_START, type: EffectType.DAMAGE, value: 4, self: false },
        ],
    },
    aAZOTH: {
        name: "Azoth",
        image: "/items/azoth.png",
        itemType: ItemType.WEAPON,
        effects: [
            { trigger: EffectTrigger.TURN_START, type: EffectType.DAMAGE, value: 5, self: false },
        ],
    },
    aAVERN: {
        name: "Avern",
        image: "/items/avern.png",
        itemType: ItemType.WEAPON,
        effects: [
            { trigger: EffectTrigger.TURN_START, type: EffectType.DAMAGE, value: 2, self: false },
            { trigger: EffectTrigger.TURN_START, type: EffectType.POISON, value: 1, self: false },
        ],
    },
    aSCYTHEOFHIERAX: {
        name: "Scythe of Hierax",
        image: "/items/scythe-of-hierax.png",
        itemType: ItemType.WEAPON,
        effects: [
            { trigger: EffectTrigger.WOUNDED, type: EffectType.ATTACK, value: 3, self: true },
            { trigger: EffectTrigger.TURN_START, type: EffectType.DAMAGE, value: 2, self: false },
        ],
    },
    aAXEOFLUNDOR: {
        name: "Axe of Lundor",
        image: "/items/axe-of-lundor.png",
        itemType: ItemType.WEAPON,
        effects: [
            { trigger: EffectTrigger.TURN_START, type: EffectType.DAMAGE, value: 3, self: false },
        ],
    },
};
