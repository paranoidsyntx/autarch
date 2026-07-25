// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";

import {Character721} from "./Character721.sol";
import {Item20} from "./Item20.sol";

contract Autarch {
    error SenderAlreadyHasCharacter(address sender);

    event ItemCreated(
        address indexed item,
        string name,
        string symbol
    );

    event CharacterMinted(
        uint256 indexed tokenId,
        string name,
        uint256 classIndex
    );

    enum ItemType {
        WEAPON,
        ITEM
    }

    enum EffectTrigger {
        PASSIVE,
        BATTLE_START,
        TURN_START,
        WOUNDED,
        EXPOSED
    }

    enum EffectType {
        HEAL,
        ARMOR,
        DAMAGE,
        POISON,
        ACID,
        STUN,
        MAX_HP,
        ATTACK,
        SPEED
    }

    struct Stats {
        uint256 maxHp; // +Apprentice
        uint256 armor; // +Knight
        uint256 attack; // +Magician
        uint256 speed; // +Rogue
    }

    struct Status {
        uint256 poison;
        uint256 acid;
        uint256 stun;
    }

    struct Actor {
        string name;
        uint256 hp;
        Stats stats;
    }

    struct Effect {
        EffectTrigger effectTrigger;
        EffectType effectType;
        int256 value;
        bool self;
    }

    struct Item {
        ItemType itemType;
        Effect[] effects;
    }

    struct StartingItem {
        address item;
        uint256 amount;
    }

    Character721 public character721;

    Item20 public item20Implementation;

    mapping(address item => Item) public items;

    StartingItem[] public startingItems;

    constructor() {
        character721 = new Character721("Autarch Character", "aCHAR");

        item20Implementation = new Item20();
    }

    function setStartingItems(StartingItem[] memory _startingItems) external {
        delete startingItems;
        for (uint256 i = 0; i < _startingItems.length; i++) {
            startingItems.push(_startingItems[i]);
        }
    }

    function createItem(
        string memory _name,
        string memory _symbol,
        Item memory _item
    ) external returns (address) {
        return _createItem(_name, _symbol, _item);
    }

    function mintCharacter(
        string memory _name,
        uint256 _classIndex
    ) external returns (uint256 characterId) {
        if (character721.balanceOf(msg.sender) > 0) {
            revert SenderAlreadyHasCharacter(msg.sender);
        }

        characterId = character721.mint(_name, _classIndex);

        for (uint256 i = 0; i < startingItems.length; i++) {
            Item20(startingItems[i].item).mint(
                msg.sender,
                startingItems[i].amount
            );
        }

        emit CharacterMinted(characterId, _name, _classIndex);
    }

    function _createItem(
        string memory _name,
        string memory _symbol,
        Item memory _item
    ) internal returns (address item) {
        item = Clones.clone(address(item20Implementation));
        Item20(item).initialize(
            _name,
            _symbol
        );

        Item storage sItem = items[item];
        sItem.itemType = _item.itemType;
        for (uint256 i = 0; i < _item.effects.length; i++) {
            sItem.effects.push(_item.effects[i]);
        }

        emit ItemCreated(item, _name, _symbol);
    }
}
