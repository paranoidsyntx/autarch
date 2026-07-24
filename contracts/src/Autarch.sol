// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Character721} from "./Character721.sol";
import {Item20} from "./Item20.sol";

contract Autarch {
    error SenderAlreadyHasCharacter(address sender);

    event ItemCreated(
        address indexed item,
        string name,
        string symbol,
        string tokenUri
    );

    event CharacterMinted(
        uint256 indexed tokenId,
        string name,
        uint256 classIndex
    );

    struct Stats {
        uint256 hp; // +Apprentice
        uint256 armor; // +Knight
        uint256 attack; // +Magician
        uint256 speed; // +Rogue
    }

    struct Actor {
        string name;
        Stats stats;
    }

    struct Item {
        uint256 itemType;
    }

    struct StartingItem {
        address item;
        uint256 amount;
    }

    Character721 public character721;

    mapping(address item => Item) public items;

    StartingItem[] public startingItems;

    constructor() {
        character721 = new Character721("Autarch Character", "aCHAR");

        // Init starting items for new characters
        startingItems.push(StartingItem({
            item: _newItem("Gold", "aGOLD", ""),
            amount: 10 ether
        }));
        startingItems.push(StartingItem({   
            item: _newItem("Stick", "aSTICK", ""),
            amount: 1 ether
        }));
        startingItems.push(StartingItem({
            item: _newItem("Healing Potion", "aHPOT", ""),
            amount: 3 ether
        }));
    }

    function newItem(
        string memory _name,
        string memory _symbol,
        string memory _tokenUri
    ) external returns (address) {
        return _newItem(_name, _symbol, _tokenUri);
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

    function _newItem(
        string memory _name,
        string memory _symbol,
        string memory _tokenUri
    ) internal returns (address item) {
        item = address(new Item20(_name, _symbol, _tokenUri));
        items[item] = Item({
            itemType: 0 // TODO
        });

        emit ItemCreated(item, _name, _symbol, _tokenUri);
    }
}
