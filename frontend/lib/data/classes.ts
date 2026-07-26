import { Stats } from "./actor";

export interface Class {
    id: number;
    name: string;
    portrait: string;
    stats: Stats;
}

export const CLASSES: Class[] = [
    {
        id: 0,
        name: "Apprentice",
        portrait: "/portraits/apprentice-portrait.png",
        stats: {
            maxHp: 15,
            armor: 0,
            attack: 1,
            speed: 1,
        },
    },
    {
        id: 1,
        name: "Knight",
        portrait: "/portraits/knight-portrait.png",
        stats: {
            maxHp: 10,
            armor: 5,
            attack: 1,
            speed: 1,
        },
    },
    {
        id: 2,
        name: "Magician",
        portrait: "/portraits/magician-portrait.png",
        stats: {
            maxHp: 10,
            armor: 0,
            attack: 2,
            speed: 1,
        },
    },
    {
        id: 3,
        name: "Rogue",
        portrait: "/portraits/rogue-portrait.png",
        stats: {
            maxHp: 10,
            armor: 0,
            attack: 1,
            speed: 2,
        },
    },
];