// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script, console2} from "forge-std/Script.sol";

import {Autarch} from "../src/Autarch.sol";

contract Deploy is Script {
    function run() public {
        vm.startBroadcast();

        Autarch autarch = new Autarch();

        vm.stopBroadcast();

        console2.log("Autarch: ", address(autarch));
    }
}