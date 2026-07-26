import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Bytes, Address } from "@graphprotocol/graph-ts"
import { CharacterMinted } from "../generated/schema"
import { CharacterMinted as CharacterMintedEvent } from "../generated/Autarch/Autarch"
import { handleCharacterMinted } from "../src/autarch"
import { createCharacterMintedEvent } from "./autarch-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let characterId = BigInt.fromI32(234)
    let name = "Example string value"
    let classIndex = BigInt.fromI32(234)
    let newCharacterMintedEvent = createCharacterMintedEvent(
      characterId,
      name,
      classIndex
    )
    handleCharacterMinted(newCharacterMintedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("CharacterMinted created and stored", () => {
    assert.entityCount("CharacterMinted", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CharacterMinted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "characterId",
      "234"
    )
    assert.fieldEquals(
      "CharacterMinted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "CharacterMinted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "classIndex",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
