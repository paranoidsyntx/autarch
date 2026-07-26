import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Bytes, Address } from "@graphprotocol/graph-ts"
import {
  CharacterMinted,
  DungeonCreated,
  DungeonItem,
  DungeonMonster,
  DungeonRest,
  DungeonStarted,
  ItemCreated
} from "../generated/Autarch/Autarch"

export function createCharacterMintedEvent(
  characterId: BigInt,
  name: string,
  classIndex: BigInt
): CharacterMinted {
  let characterMintedEvent = changetype<CharacterMinted>(newMockEvent())

  characterMintedEvent.parameters = new Array()

  characterMintedEvent.parameters.push(
    new ethereum.EventParam(
      "characterId",
      ethereum.Value.fromUnsignedBigInt(characterId)
    )
  )
  characterMintedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  characterMintedEvent.parameters.push(
    new ethereum.EventParam(
      "classIndex",
      ethereum.Value.fromUnsignedBigInt(classIndex)
    )
  )

  return characterMintedEvent
}

export function createDungeonCreatedEvent(
  dungeonId: Bytes,
  totalEncounters: BigInt
): DungeonCreated {
  let dungeonCreatedEvent = changetype<DungeonCreated>(newMockEvent())

  dungeonCreatedEvent.parameters = new Array()

  dungeonCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "dungeonId",
      ethereum.Value.fromFixedBytes(dungeonId)
    )
  )
  dungeonCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "totalEncounters",
      ethereum.Value.fromUnsignedBigInt(totalEncounters)
    )
  )

  return dungeonCreatedEvent
}

export function createDungeonItemEvent(
  characterId: BigInt,
  item: Address,
  itemId: Bytes,
  gainedExp: BigInt,
  encounterIndexes: Array<BigInt>
): DungeonItem {
  let dungeonItemEvent = changetype<DungeonItem>(newMockEvent())

  dungeonItemEvent.parameters = new Array()

  dungeonItemEvent.parameters.push(
    new ethereum.EventParam(
      "characterId",
      ethereum.Value.fromUnsignedBigInt(characterId)
    )
  )
  dungeonItemEvent.parameters.push(
    new ethereum.EventParam("item", ethereum.Value.fromAddress(item))
  )
  dungeonItemEvent.parameters.push(
    new ethereum.EventParam("itemId", ethereum.Value.fromFixedBytes(itemId))
  )
  dungeonItemEvent.parameters.push(
    new ethereum.EventParam(
      "gainedExp",
      ethereum.Value.fromUnsignedBigInt(gainedExp)
    )
  )
  dungeonItemEvent.parameters.push(
    new ethereum.EventParam(
      "encounterIndexes",
      ethereum.Value.fromUnsignedBigIntArray(encounterIndexes)
    )
  )

  return dungeonItemEvent
}

export function createDungeonMonsterEvent(
  characterId: BigInt,
  resolution: i32,
  gainedExp: BigInt,
  encounterIndexes: Array<BigInt>
): DungeonMonster {
  let dungeonMonsterEvent = changetype<DungeonMonster>(newMockEvent())

  dungeonMonsterEvent.parameters = new Array()

  dungeonMonsterEvent.parameters.push(
    new ethereum.EventParam(
      "characterId",
      ethereum.Value.fromUnsignedBigInt(characterId)
    )
  )
  dungeonMonsterEvent.parameters.push(
    new ethereum.EventParam(
      "resolution",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(resolution))
    )
  )
  dungeonMonsterEvent.parameters.push(
    new ethereum.EventParam(
      "gainedExp",
      ethereum.Value.fromUnsignedBigInt(gainedExp)
    )
  )
  dungeonMonsterEvent.parameters.push(
    new ethereum.EventParam(
      "encounterIndexes",
      ethereum.Value.fromUnsignedBigIntArray(encounterIndexes)
    )
  )

  return dungeonMonsterEvent
}

export function createDungeonRestEvent(
  characterId: BigInt,
  prevHp: BigInt,
  newHp: BigInt,
  encounterIndexes: Array<BigInt>
): DungeonRest {
  let dungeonRestEvent = changetype<DungeonRest>(newMockEvent())

  dungeonRestEvent.parameters = new Array()

  dungeonRestEvent.parameters.push(
    new ethereum.EventParam(
      "characterId",
      ethereum.Value.fromUnsignedBigInt(characterId)
    )
  )
  dungeonRestEvent.parameters.push(
    new ethereum.EventParam("prevHp", ethereum.Value.fromUnsignedBigInt(prevHp))
  )
  dungeonRestEvent.parameters.push(
    new ethereum.EventParam("newHp", ethereum.Value.fromUnsignedBigInt(newHp))
  )
  dungeonRestEvent.parameters.push(
    new ethereum.EventParam(
      "encounterIndexes",
      ethereum.Value.fromUnsignedBigIntArray(encounterIndexes)
    )
  )

  return dungeonRestEvent
}

export function createDungeonStartedEvent(
  characterId: BigInt,
  dungeonId: Bytes,
  encounterIndexes: Array<BigInt>
): DungeonStarted {
  let dungeonStartedEvent = changetype<DungeonStarted>(newMockEvent())

  dungeonStartedEvent.parameters = new Array()

  dungeonStartedEvent.parameters.push(
    new ethereum.EventParam(
      "characterId",
      ethereum.Value.fromUnsignedBigInt(characterId)
    )
  )
  dungeonStartedEvent.parameters.push(
    new ethereum.EventParam(
      "dungeonId",
      ethereum.Value.fromFixedBytes(dungeonId)
    )
  )
  dungeonStartedEvent.parameters.push(
    new ethereum.EventParam(
      "encounterIndexes",
      ethereum.Value.fromUnsignedBigIntArray(encounterIndexes)
    )
  )

  return dungeonStartedEvent
}

export function createItemCreatedEvent(
  itemId: Bytes,
  item: Address,
  name: string,
  symbol: string
): ItemCreated {
  let itemCreatedEvent = changetype<ItemCreated>(newMockEvent())

  itemCreatedEvent.parameters = new Array()

  itemCreatedEvent.parameters.push(
    new ethereum.EventParam("itemId", ethereum.Value.fromFixedBytes(itemId))
  )
  itemCreatedEvent.parameters.push(
    new ethereum.EventParam("item", ethereum.Value.fromAddress(item))
  )
  itemCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  itemCreatedEvent.parameters.push(
    new ethereum.EventParam("symbol", ethereum.Value.fromString(symbol))
  )

  return itemCreatedEvent
}
