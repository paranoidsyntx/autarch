// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Character721} from "./Character721.sol";
import {Item20} from "./Item20.sol";

contract Autarch {
    error SenderAlreadyOwnsCharacter(address sender);

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

    struct StartingItem {
        address item;
        uint256 amount;
    }

    Character721 public character721;

    StartingItem[] public startingItems;

    constructor(StartingItem[] memory _startingItems) {
        character721 = new Character721("Autarch Character", "aCHAR");

        for (uint256 i = 0; i < _startingItems.length; i++) {
            startingItems.push(_startingItems[i]);
        }
    }

    function newPlayer(
        string memory _name,
        uint256 _classIndex
    ) external returns (uint256 characterId) {
        if (character721.balanceOf(msg.sender) > 0) {
            revert SenderAlreadyOwnsCharacter(msg.sender);
        }

        characterId = character721.mint(_name, _classIndex);

        for (uint256 i = 0; i < startingItems.length; i++) {
            Item20(startingItems[i].item).mint(
                msg.sender,
                startingItems[i].amount
            );
        }
    }
}
