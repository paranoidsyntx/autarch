// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {AccessManaged} from "@openzeppelin/contracts/access/manager/AccessManaged.sol";

import {IItem20} from "./IItem20.sol";

contract Item20 is ERC20, AccessManaged, IItem20 {
    string private _uri;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _tokenUri,
        address _accessManager
    ) ERC20(_name, _symbol) AccessManaged(_accessManager) {
        _uri = _tokenUri;
    }

    function decimals() public pure override(ERC20, IERC20Metadata) returns (uint8) {
        return 0;
    }

    function tokenURI() external view override returns (string memory) {
        return _uri;
    }

    function mint(address to, uint256 amount) external restricted {
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
