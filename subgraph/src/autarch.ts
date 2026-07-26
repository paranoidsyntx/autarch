import {
  CharacterMinted as CharacterMintedEvent,
  ItemCreated as ItemCreatedEvent
} from "../generated/Autarch/Autarch";
import {
  Character,
  Item
} from "../generated/schema";
import { Item20 } from "../generated/templates";

export function handleCharacterMinted(event: CharacterMintedEvent): void {
  let character = new Character(event.params.owner);
  character.characterId = event.params.characterId;
  character.name = event.params.name;
  character.classIndex = event.params.classIndex;
  character.save();
}

export function handleItemCreated(event: ItemCreatedEvent): void {
  let item = new Item(event.params.item);
  item.itemId = event.params.itemId;
  item.name = event.params.name;
  item.symbol = event.params.symbol;
  item.save();

  Item20.create(event.params.item);
}