// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Item20} from "./Item20.sol";

contract Item20Factory {
    event ItemCreated(
        address indexed item,
        string name,
        string symbol,
        string tokenUri
    );

    function newItem(
        string memory _name,
        string memory _symbol,
        string memory _tokenUri
    ) external returns (address item) {
        item = address(new Item20(_name, _symbol, _tokenUri));

        emit ItemCreated(item, _name, _symbol, _tokenUri);
    }
}
