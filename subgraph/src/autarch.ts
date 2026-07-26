import {
  CharacterMinted as CharacterMintedEvent,
  DungeonCreated as DungeonCreatedEvent,
  DungeonItem as DungeonItemEvent,
  DungeonMonster as DungeonMonsterEvent,
  DungeonRest as DungeonRestEvent,
  DungeonStarted as DungeonStartedEvent,
  ItemCreated as ItemCreatedEvent
} from "../generated/Autarch/Autarch"
import {
  CharacterMinted,
  DungeonCreated,
  DungeonItem,
  DungeonMonster,
  DungeonRest,
  DungeonStarted,
  ItemCreated
} from "../generated/schema"

export function handleCharacterMinted(event: CharacterMintedEvent): void {
  let entity = new CharacterMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.characterId = event.params.characterId
  entity.name = event.params.name
  entity.classIndex = event.params.classIndex

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDungeonCreated(event: DungeonCreatedEvent): void {
  let entity = new DungeonCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.dungeonId = event.params.dungeonId
  entity.totalEncounters = event.params.totalEncounters

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDungeonItem(event: DungeonItemEvent): void {
  let entity = new DungeonItem(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.characterId = event.params.characterId
  entity.item = event.params.item
  entity.itemId = event.params.itemId
  entity.gainedExp = event.params.gainedExp
  entity.encounterIndexes = event.params.encounterIndexes

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDungeonMonster(event: DungeonMonsterEvent): void {
  let entity = new DungeonMonster(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.characterId = event.params.characterId
  entity.resolution = event.params.resolution
  entity.gainedExp = event.params.gainedExp
  entity.encounterIndexes = event.params.encounterIndexes

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDungeonRest(event: DungeonRestEvent): void {
  let entity = new DungeonRest(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.characterId = event.params.characterId
  entity.prevHp = event.params.prevHp
  entity.newHp = event.params.newHp
  entity.encounterIndexes = event.params.encounterIndexes

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDungeonStarted(event: DungeonStartedEvent): void {
  let entity = new DungeonStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.characterId = event.params.characterId
  entity.dungeonId = event.params.dungeonId
  entity.encounterIndexes = event.params.encounterIndexes

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleItemCreated(event: ItemCreatedEvent): void {
  let entity = new ItemCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.itemId = event.params.itemId
  entity.item = event.params.item
  entity.name = event.params.name
  entity.symbol = event.params.symbol

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
