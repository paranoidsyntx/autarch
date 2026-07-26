import { Stats } from "./actor";
import { Effect, EffectTrigger, EffectType } from "./items";

export interface Monster {
    name: string;
    color: string;
    exp: number;
    stats: Stats;
    effects: Effect[];
}

export const MONSTERS: Record<string, Monster> = {
    aMANAPE: {
        name: "Man-ape",
        color: "#a3e635",
        exp: 15,
        stats: { maxHp: 3, armor: 0, attack: 0, speed: 1 },
        effects: [
            { trigger: EffectTrigger.TURN_START, type: EffectType.DAMAGE, value: 2, self: false },
        ],
    },
    aDEODAND: {
        name: "Deodand",
        color: "#c084fc",
        exp: 25,
        stats: { maxHp: 4, armor: 0, attack: 0, speed: 1 },
        effects: [
            { trigger: EffectTrigger.TURN_START, type: EffectType.DAMAGE, value: 2, self: false },
        ],
    },
    aALZABO: {
        name: "Alzabo",
        color: "#f87171",
        exp: 70,
        stats: { maxHp: 6, armor: 0, attack: 0, speed: 4 },
        effects: [
            { trigger: EffectTrigger.WOUNDED, type: EffectType.HEAL, value: 3, self: true },
            { trigger: EffectTrigger.TURN_START, type: EffectType.DAMAGE, value: 2, self: false },
        ],
    },
    aBIGCHOPPA: {
        name: "Big Choppa",
        color: "#fb923c",
        exp: 50,
        stats: { maxHp: 6, armor: 2, attack: 0, speed: 0 },
        effects: [
            { trigger: EffectTrigger.TURN_START, type: EffectType.DAMAGE, value: 4, self: false },
        ],
    },
    aSALAMANDER: {
        name: "Salamander",
        color: "#f97316",
        exp: 30,
        stats: { maxHp: 3, armor: 0, attack: 0, speed: 2 },
        effects: [
            { trigger: EffectTrigger.TURN_START, type: EffectType.DAMAGE, value: 4, self: false },
        ],
    },
    aLAUGHINGMAGICIAN: {
        name: "Laughing Magician",
        color: "#e879f9",
        exp: 100,
        stats: { maxHp: 10, armor: 0, attack: 0, speed: 3 },
        effects: [
            { trigger: EffectTrigger.WOUNDED, type: EffectType.STUN, value: 3, self: false },
            { trigger: EffectTrigger.TURN_START, type: EffectType.DAMAGE, value: 2, self: false },
        ],
    },
};
