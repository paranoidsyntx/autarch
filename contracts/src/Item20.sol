// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import {IERC1046} from "./utils/IERC1046.sol";

contract Item20 is ERC20, IERC1046 {
    string private _uri;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _tokenUri
    ) ERC20(_name, _symbol) {
        _uri = _tokenUri;
    }

    function tokenURI() external view override returns (string memory) {
        return _uri;
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
