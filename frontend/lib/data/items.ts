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
    color: string;
    itemType: ItemType;
    effects: Effect[];
}

export const EFFECT_COLORS: Record<EffectType, string> = {
    [EffectType.DAMAGE]: "#ef4444",
    [EffectType.HEAL]: "#22c55e",
    [EffectType.STUN]: "#eab308",
    [EffectType.POISON]: "#a855f7",
    [EffectType.ARMOR]: "#06b6d4",
    [EffectType.ATTACK]: "#f97316",
    [EffectType.SPEED]: "#38bdf8",
    [EffectType.MAX_HP]: "#4ade80",
};

export const ITEMS: Record<string, Item> = {
    aGOLD: {
        name: "Gold",
        image: "/items/gold.png",
        color: "#fbbf24",
        itemType: ItemType.ITEM,
        effects: [],
    },
    aOSHERLSMERCY: {
        name: "Osherl's Mercy",
        image: "/items/osherls-mercy.png",
        color: "#86efac",
        itemType: ItemType.ITEM,
        effects: [
            { trigger: EffectTrigger.WOUNDED, type: EffectType.HEAL, value: 4, self: true },
        ],
    },
    aMAZIRIANSBOOTS: {
        name: "Mazirian's Boots",
        image: "/items/mazirians-boots.png",
        color: "#a78bfa",
        itemType: ItemType.ITEM,
        effects: [
            { trigger: EffectTrigger.PASSIVE, type: EffectType.SPEED, value: 6, self: true },
            { trigger: EffectTrigger.TURN_START, type: EffectType.DAMAGE, value: 1, self: true },
        ],
    },
    aIOUNSTONE: {
        name: "IOUN Stone",
        image: "/items/ioun-stone.png",
        color: "#67e8f9",
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
        color: "#f87171",
        itemType: ItemType.ITEM,
        effects: [
            { trigger: EffectTrigger.BATTLE_START, type: EffectType.HEAL, value: 5, self: true },
            { trigger: EffectTrigger.WOUNDED, type: EffectType.HEAL, value: 5, self: true },
        ],
    },
    aFULIGINCLOAK: {
        name: "Fuligin Cloak",
        image: "/items/fuligin-cloak.png",
        color: "#94a3b8",
        itemType: ItemType.ITEM,
        effects: [
            { trigger: EffectTrigger.PASSIVE, type: EffectType.SPEED, value: 2, self: true },
        ],
    },
    aPRISMATICSPRAY: {
        name: "Prismatic Spray",
        image: "/items/prismatic-spray.png",
        color: "#f472b6",
        itemType: ItemType.ITEM,
        effects: [
            { trigger: EffectTrigger.BATTLE_START, type: EffectType.DAMAGE, value: 3, self: false },
        ],
    },
    aBALDANDERSSERUM: {
        name: "Baldanders' Serum",
        image: "/items/baldanders-serum.png",
        color: "#4ade80",
        itemType: ItemType.ITEM,
        effects: [
            { trigger: EffectTrigger.PASSIVE, type: EffectType.MAX_HP, value: 7, self: true },
        ],
    },
    aSARSEMSWARD: {
        name: "Sarsem's Ward",
        image: "/items/sarsems-ward.png",
        color: "#60a5fa",
        itemType: ItemType.ITEM,
        effects: [
            { trigger: EffectTrigger.EXPOSED, type: EffectType.ARMOR, value: 5, self: true },
        ],
    },
    aSCALEOFSADLARK: {
        name: "Scale of Sadlark",
        image: "/items/scale-of-sadlark.png",
        color: "#2dd4bf",
        itemType: ItemType.ITEM,
        effects: [
            { trigger: EffectTrigger.PASSIVE, type: EffectType.ARMOR, value: 3, self: true },
        ],
    },
    aAMULETOFATULOS: {
        name: "Amulet of Atulos",
        image: "/items/amulet-of-atulos.png",
        color: "#e879f9",
        itemType: ItemType.ITEM,
        effects: [
            { trigger: EffectTrigger.WOUNDED, type: EffectType.STUN, value: 2, self: false },
        ],
    },
    aWITHEREDAVERN: {
        name: "Withered Avern",
        image: "/items/withered-avern.png",
        color: "#a3e635",
        itemType: ItemType.WEAPON,
        effects: [
            { trigger: EffectTrigger.TURN_START, type: EffectType.DAMAGE, value: 1, self: false },
        ],
    },
    aTERMINUSEST: {
        name: "Terminus Est",
        image: "/items/terminus-est.png",
        color: "#f9fafb",
        itemType: ItemType.WEAPON,
        effects: [
            { trigger: EffectTrigger.PASSIVE, type: EffectType.SPEED, value: 1, self: true },
            { trigger: EffectTrigger.TURN_START, type: EffectType.DAMAGE, value: 4, self: false },
        ],
    },
    aAZOTH: {
        name: "Azoth",
        image: "/items/azoth.png",
        color: "#38bdf8",
        itemType: ItemType.WEAPON,
        effects: [
            { trigger: EffectTrigger.TURN_START, type: EffectType.DAMAGE, value: 5, self: false },
        ],
    },
    aAVERN: {
        name: "Avern",
        image: "/items/avern.png",
        color: "#34d399",
        itemType: ItemType.WEAPON,
        effects: [
            { trigger: EffectTrigger.TURN_START, type: EffectType.DAMAGE, value: 2, self: false },
            { trigger: EffectTrigger.TURN_START, type: EffectType.POISON, value: 1, self: false },
        ],
    },
    aSCYTHEOFHIERAX: {
        name: "Scythe of Hierax",
        image: "/items/scythe-of-hierax.png",
        color: "#fb923c",
        itemType: ItemType.WEAPON,
        effects: [
            { trigger: EffectTrigger.WOUNDED, type: EffectType.ATTACK, value: 3, self: true },
            { trigger: EffectTrigger.TURN_START, type: EffectType.DAMAGE, value: 2, self: false },
        ],
    },
    aAXEOFLUNDOR: {
        name: "Axe of Lundor",
        image: "/items/axe-of-lundor.png",
        color: "#fca5a5",
        itemType: ItemType.WEAPON,
        effects: [
            { trigger: EffectTrigger.TURN_START, type: EffectType.DAMAGE, value: 3, self: false },
        ],
    },
};
