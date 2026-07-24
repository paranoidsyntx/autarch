// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

import {IERC1046} from "./utils/IERC1046.sol";

interface IItem20 is IERC20, IERC20Metadata, IERC1046 {
    function mint(address to, uint256 amount) external;

    function burn(uint256 amount) external;
}