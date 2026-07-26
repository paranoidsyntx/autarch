import { Effect, EffectTrigger, EffectType, ITEMS } from "./data/items";
import { Monster } from "./data/monsters";
import { Stats } from "./data/actor";

export interface CombatResult {
  characterHp: number;
  resolution: "death" | "kill" | "fled";
}

interface Status {
  poison: number;
  acid: number;
  stun: number;
}

interface Combatant {
  hp: number;
  maxHp: number;
  armor: number;
  hadArmor: boolean;
  attack: number;
  speed: number;
  status: Status;
  wounded: boolean;
  exposed: boolean;
}

interface EffectSources {
  innate: Effect[];
  items: Effect[][];
  weapon: Effect[];
}

function dealDamage(target: Combatant, damage: number) {
  if (damage <= target.armor) {
    target.armor -= damage;
    return;
  }
  damage -= target.armor;
  target.armor = 0;
  target.hp = Math.max(0, target.hp - damage);
}

function applyEffect(
  self: Combatant,
  other: Combatant,
  effect: Effect,
  isWeapon: boolean
): boolean {
  const target = effect.self ? self : other;

  switch (effect.type) {
    case EffectType.DAMAGE: {
      if (effect.value === 0) return false;
      let damage = effect.value;
      if (isWeapon && effect.trigger === EffectTrigger.TURN_START) {
        damage += self.attack;
      }
      dealDamage(target, damage);
      break;
    }
    case EffectType.HEAL:
      target.hp = Math.min(target.maxHp, target.hp + effect.value);
      break;
    case EffectType.ARMOR:
      target.armor += effect.value;
      target.hadArmor = true;
      break;
    case EffectType.POISON:
      target.status.poison += effect.value;
      break;
    case EffectType.STUN:
      target.status.stun += effect.value;
      break;
    case EffectType.MAX_HP:
      target.maxHp += effect.value;
      break;
    case EffectType.ATTACK:
      target.attack += effect.value;
      break;
    case EffectType.SPEED:
      target.speed += effect.value;
      break;
  }

  return self.hp === 0 || other.hp === 0;
}

function applyTriggeredEffects(
  self: Combatant,
  other: Combatant,
  trigger: EffectTrigger,
  sources: EffectSources
): boolean {
  for (const effect of sources.innate) {
    if (effect.trigger === trigger) {
      if (applyEffect(self, other, effect, false)) return true;
    }
  }
  for (const itemEffects of sources.items) {
    for (const effect of itemEffects) {
      if (effect.trigger === trigger) {
        if (applyEffect(self, other, effect, false)) return true;
      }
    }
  }
  for (const effect of sources.weapon) {
    if (effect.trigger === trigger) {
      if (applyEffect(self, other, effect, true)) return true;
    }
  }
  return false;
}

function checkWounded(
  self: Combatant,
  other: Combatant,
  sources: EffectSources
): boolean {
  if (self.wounded || self.hp > Math.floor(self.maxHp / 2)) return false;
  self.wounded = true;
  return applyTriggeredEffects(self, other, EffectTrigger.WOUNDED, sources);
}

function checkExposed(
  self: Combatant,
  other: Combatant,
  sources: EffectSources
): boolean {
  if (self.exposed || self.armor > 0 || !self.hadArmor) return false;
  self.exposed = true;
  return applyTriggeredEffects(self, other, EffectTrigger.EXPOSED, sources);
}

function takeTurn(
  self: Combatant,
  other: Combatant,
  sources: EffectSources
): boolean {
  if (self.status.acid > 0 && self.armor > 0) {
    self.armor = self.status.acid > self.armor ? 0 : self.armor - self.status.acid;
  }

  if (self.status.poison > 0) {
    if (self.armor === 0) {
      dealDamage(self, self.status.poison);
      if (self.hp === 0) return true;
    }
    self.status.poison--;
  }

  if (self.status.stun > 0) {
    self.status.stun--;
    return false;
  }

  if (checkWounded(self, other, sources)) return true;
  if (checkExposed(self, other, sources)) return true;

  return applyTriggeredEffects(self, other, EffectTrigger.TURN_START, sources);
}

export function simulateCombat(
  characterHp: number,
  characterStats: Stats,
  itemKeys: string[],
  monster: Monster
): CombatResult {
  const char: Combatant = {
    hp: characterHp,
    maxHp: characterStats.maxHp,
    armor: characterStats.armor,
    hadArmor: characterStats.armor > 0,
    attack: characterStats.attack,
    speed: characterStats.speed,
    status: { poison: 0, acid: 0, stun: 0 },
    wounded: false,
    exposed: false,
  };

  const mob: Combatant = {
    hp: monster.stats.maxHp,
    maxHp: monster.stats.maxHp,
    armor: monster.stats.armor,
    hadArmor: monster.stats.armor > 0,
    attack: monster.stats.attack,
    speed: monster.stats.speed,
    status: { poison: 0, acid: 0, stun: 0 },
    wounded: false,
    exposed: false,
  };

  const charSources: EffectSources = {
    innate: [],
    items: itemKeys.slice(1).map((key) => ITEMS[key]?.effects ?? []),
    weapon: itemKeys.length > 0 ? (ITEMS[itemKeys[0]]?.effects ?? []) : [],
  };

  const mobSources: EffectSources = {
    innate: monster.effects,
    items: [],
    weapon: [],
  };

  // BATTLE_START effects in speed order; ties favor the monster
  if (char.speed > mob.speed) {
    if (applyTriggeredEffects(char, mob, EffectTrigger.BATTLE_START, charSources)) {
      return char.hp === 0
        ? { characterHp: 0, resolution: "death" }
        : { characterHp: char.hp, resolution: "kill" };
    }
    if (applyTriggeredEffects(mob, char, EffectTrigger.BATTLE_START, mobSources)) {
      return char.hp === 0
        ? { characterHp: 0, resolution: "death" }
        : { characterHp: char.hp, resolution: "kill" };
    }
  } else {
    if (applyTriggeredEffects(mob, char, EffectTrigger.BATTLE_START, mobSources)) {
      return char.hp === 0
        ? { characterHp: 0, resolution: "death" }
        : { characterHp: char.hp, resolution: "kill" };
    }
    if (applyTriggeredEffects(char, mob, EffectTrigger.BATTLE_START, charSources)) {
      return char.hp === 0
        ? { characterHp: 0, resolution: "death" }
        : { characterHp: char.hp, resolution: "kill" };
    }
  }

  for (let round = 0; round < 25; round++) {
    const characterFirst = char.speed > mob.speed;

    if (characterFirst) {
      if (takeTurn(char, mob, charSources)) {
        return mob.hp === 0
          ? { characterHp: char.hp, resolution: "kill" }
          : { characterHp: char.hp, resolution: "death" };
      }
      if (takeTurn(mob, char, mobSources)) {
        return char.hp === 0
          ? { characterHp: 0, resolution: "death" }
          : { characterHp: char.hp, resolution: "kill" };
      }
    } else {
      if (takeTurn(mob, char, mobSources)) {
        return char.hp === 0
          ? { characterHp: 0, resolution: "death" }
          : { characterHp: char.hp, resolution: "kill" };
      }
      if (takeTurn(char, mob, charSources)) {
        return mob.hp === 0
          ? { characterHp: char.hp, resolution: "kill" }
          : { characterHp: char.hp, resolution: "death" };
      }
    }
  }

  return { characterHp: char.hp, resolution: "fled" };
}

export function applyPassiveStats(baseStats: Stats, itemKeys: string[]): Stats {
  const stats = { ...baseStats };
  for (const key of itemKeys) {
    const item = ITEMS[key];
    if (!item) continue;
    for (const effect of item.effects) {
      if (effect.trigger !== EffectTrigger.PASSIVE || effect.value === 0) continue;
      switch (effect.type) {
        case EffectType.MAX_HP:
          stats.maxHp += effect.value;
          break;
        case EffectType.ARMOR:
          stats.armor += effect.value;
          break;
        case EffectType.ATTACK:
          stats.attack += effect.value;
          break;
        case EffectType.SPEED:
          stats.speed += effect.value;
          break;
      }
    }
  }
  return stats;
}
