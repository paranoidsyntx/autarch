// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Character721} from "./Character721.sol";

contract Autarch {
    Character721 public character721;

    constructor(address _character721) {
        character721 = Character721(_character721);
    }

    function newPlayer(string memory _name, uint256 _classIndex) external returns (uint256 characterId) {
        if(character721.balanceOf(msg.sender) > 0) {
            revert("Sender already has a character");
        }

        characterId = character721.mint(_name, _classIndex);

        // TODO: Mint some starting items
    }
}