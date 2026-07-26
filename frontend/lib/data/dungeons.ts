export interface MonsterEncounter {
    chance: number;
    monsterId: string;
}

export interface ItemEncounter {
    chance: number;
    itemId: string;
}

export interface Dungeon {
    id: string;
    name: string;
    image: string;
    difficulty: number;
    totalEncounters: number;
    restChance: number;
    monsterChance: number;
    itemChance: number;
    monsters: MonsterEncounter[];
    items: ItemEncounter[];
}

export const DUNGEONS: Record<string, Dungeon> = {
    aVENNELENGLADES: {
        id: "aVENNELENGLADES",
        name: "Vennelen Glades",
        image: "/dungeons/vennelen-glades.png",
        difficulty: 1,
        totalEncounters: 4,
        restChance: 250,
        monsterChance: 600,
        itemChance: 150,
        monsters: [
            { chance: 550, monsterId: "aMANAPE" },
            { chance: 350, monsterId: "aDEODAND" },
            { chance: 100, monsterId: "aALZABO" },
        ],
        items: [
            { chance: 100, itemId: "aFULIGINCLOAK" },
            { chance: 100, itemId: "aSARSEMSWARD" },
            { chance: 100, itemId: "aMAZIRIANSBOOTS" },
            { chance: 100, itemId: "aAXEOFLUNDOR" },
            { chance: 100, itemId: "aAVERN" },
        ],
    },
    aMINESOFSALTUS: {
        id: "aMINESOFSALTUS",
        name: "Mines of Saltus",
        image: "/dungeons/mines-of-saltus.png",
        difficulty: 2,
        totalEncounters: 5,
        restChance: 150,
        monsterChance: 600,
        itemChance: 250,
        monsters: [
            { chance: 300, monsterId: "aMANAPE" },
            { chance: 400, monsterId: "aDEODAND" },
            { chance: 300, monsterId: "aBIGCHOPPA" },
        ],
        items: [
            { chance: 100, itemId: "aAMULETOFATULOS" },
            { chance: 100, itemId: "aCONCILIATORSCLAW" },
            { chance: 100, itemId: "aSCALEOFSADLARK" },
            { chance: 100, itemId: "aSCYTHEOFHIERAX" },
        ],
    },
    aIUCOUNUSMANSE: {
        id: "aIUCOUNUSMANSE",
        name: "Iucounu's Manse",
        image: "/dungeons/iucounus-manse.png",
        difficulty: 3,
        totalEncounters: 5,
        restChance: 200,
        monsterChance: 500,
        itemChance: 300,
        monsters: [
            { chance: 300, monsterId: "aLAUGHINGMAGICIAN" },
            { chance: 700, monsterId: "aSALAMANDER" },
        ],
        items: [
            { chance: 100, itemId: "aPRISMATICSPRAY" },
            { chance: 100, itemId: "aIOUNSTONE" },
            { chance: 100, itemId: "aBALDANDERSSERUM" },
            { chance: 100, itemId: "aAZOTH" },
            { chance: 100, itemId: "aTERMINUSEST" },
        ],
    },
};
