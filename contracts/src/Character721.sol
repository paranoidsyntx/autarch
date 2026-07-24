// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {Base64} from "@openzeppelin/contracts/utils/Base64.sol";

contract Character721 is ERC721 {
    using Strings for uint256;

    struct Stats {
        uint256 hp; // +Apprentice
        uint256 armor; // +Knight
        uint256 attack; // +Magician
        uint256 speed; // +Rogue
    }

    struct Class {
        string name;
        string imageData;
        Stats stats;
    }

    struct Actor {
        string name;
        Stats stats;
    }

    struct Character {
        Actor actor;
        uint256 classIndex;
    }

    event CharacterMinted(uint256 indexed tokenId, string name, uint256 classIndex);

    Class[] public classes;

    mapping(uint256 tokenId => Character) private _characters;
    uint256 private _totalCharacters;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        classes.push(
            Class({
                name: "Apprentice",
                imageData: "UklGRpABAABXRUJQVlA4WAoAAAAIAAAAHwAAHwAAVlA4TJIAAAAvH8AHAAWjto0EhT9pP3Zm945BRP8noE/1LYUqvtDM4U1BRZGXqEKEF9plvtIMqbdSUUHRg0ojVA/azSWf2NOHrlyRytAbXUAV7arkmAu2WdUytnL45SxS31G57XJT0eJidlY6ujaWs8r5RjmrKG+Us9kHCjH5QKFMltoUpOqCXuRFizpksuhFQvmgrWFv6DxkAUVYSUbYAAAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAADEBAgARAAAAZgAAAGmHBAABAAAAeAAAAAAAAABgAAAAAQAAAGAAAAABAAAAUGFpbnQuTkVUIDUuMS4xMgAABQAAkAcABAAAADAyMzABoAMAAQAAAAEAAAACoAQAAQAAACAAAAADoAQAAQAAACAAAAAFoAQAAQAAALoAAAAAAAAAAgABAAIABAAAAFI5OAACAAcABAAAADAxMDAAAAAA",
                stats: Stats({hp: 15, armor: 0, attack: 1, speed: 1})
            })
        );
        classes.push(
            Class({
                name: "Knight",
                imageData: "UklGRowBAABXRUJQVlA4WAoAAAAIAAAAHwAAHwAAVlA4TI0AAAAvH8AHAAWitm1k/qTzuN3uIET0fwLo9DHXh67oZlFM5T6EimZ1kypkkZ3mjeomFi52wQ42yjn4oobl8VgDyt9Iab8okgeLDpmUsmlI4hcJvVXWf+pXbtVGKWXXB+uVroRGLm5oU86CoagwFVS2jRiCBxUVR94HFFVT84pyKXNYkIosw4d99ll0oidjVwoARVhJRtgAAABJSSoACAAAAAYAEgEDAAEAAAABAAAAGgEFAAEAAABWAAAAGwEFAAEAAABeAAAAKAEDAAEAAAACAAAAMQECABEAAABmAAAAaYcEAAEAAAB4AAAAAAAAAGAAAAABAAAAYAAAAAEAAABQYWludC5ORVQgNS4xLjEyAAAFAACQBwAEAAAAMDIzMAGgAwABAAAAAQAAAAKgBAABAAAAIAAAAAOgBAABAAAAIAAAAAWgBAABAAAAugAAAAAAAAACAAEAAgAEAAAAUjk4AAIABwAEAAAAMDEwMAAAAAA=",
                stats: Stats({hp: 10, armor: 5, attack: 1, speed: 1})
            })
        );
        classes.push(
            Class({
                name: "Magician",
                imageData: "UklGRpABAABXRUJQVlA4WAoAAAAIAAAAHwAAHwAAVlA4TJEAAAAvH8AHAIWjtpEEyfxJ5zHdM3s6AhH9nwD/WJ9VgvqkUAX1VFQ6j17omuolXPRQmS/OoYTeVAcZ2znGYc9grFyU0KnhPpJmegmqVNL5Gxp1BClbKPouVdKScnXiggy6fOjCYdEyd8ptaGlRRVddjeaE6EUV5GzKRCM0pKt9q0irLXux6QtC+YGOex+ImzyIOgwWAEVYSUbYAAAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAADEBAgARAAAAZgAAAGmHBAABAAAAeAAAAAAAAABgAAAAAQAAAGAAAAABAAAAUGFpbnQuTkVUIDUuMS4xMgAABQAAkAcABAAAADAyMzABoAMAAQAAAAEAAAACoAQAAQAAACAAAAADoAQAAQAAACAAAAAFoAQAAQAAALoAAAAAAAAAAgABAAIABAAAAFI5OAACAAcABAAAADAxMDAAAAAA",
                stats: Stats({hp: 10, armor: 0, attack: 2, speed: 1})
            })
        );
        classes.push(
            Class({
                name: "Rogue",
                imageData: "UklGRoYBAABXRUJQVlA4WAoAAAAIAAAAHwAAHwAAVlA4TIgAAAAvH8AHAAWjto0EhT9pP3Z2bo9BRP8noI/mXts+8fWbdfXNttG73lj2xrK/2tq491evXHvk3meDa1ssXJtdvzVaHnnX/KCLTQirrqoUxdCBigZCDA2VZihi6BILRXFcFY0oVTDpNBSlkUOzKZKjrDKlyk2ZKqocVNlRLDBgmjUOkg9kJTu6X64DRVhJRtgAAABJSSoACAAAAAYAEgEDAAEAAAABAAAAGgEFAAEAAABWAAAAGwEFAAEAAABeAAAAKAEDAAEAAAACAAAAMQECABEAAABmAAAAaYcEAAEAAAB4AAAAAAAAAGAAAAABAAAAYAAAAAEAAABQYWludC5ORVQgNS4xLjEyAAAFAACQBwAEAAAAMDIzMAGgAwABAAAAAQAAAAKgBAABAAAAIAAAAAOgBAABAAAAIAAAAAWgBAABAAAAugAAAAAAAAACAAEAAgAEAAAAUjk4AAIABwAEAAAAMDEwMAAAAAA=",
                stats: Stats({hp: 10, armor: 0, attack: 1, speed: 2})
            })
        );
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireOwned(tokenId);

        Character memory character = _characters[tokenId];
        Class memory class = classes[character.classIndex];

        string memory svgImage = string.concat(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"><image style="image-rendering: pixelated; image-rendering: crisp-edges;" href="',
            "data:image/webp;base64,",
            class.imageData,
            '"/></svg>'
        );

        string memory attributes = string.concat(
            '[{"trait_type":"Class","value":"',
            class.name,
            '"},',
            '{"trait_type":"HP","value":"',
            character.actor.stats.hp.toString(),
            '"},',
            '{"trait_type":"Armor","value":"',
            character.actor.stats.armor.toString(),
            '"},',
            '{"trait_type":"Attack","value":"',
            character.actor.stats.attack.toString(),
            '"},',
            '{"trait_type":"Speed","value":"',
            character.actor.stats.speed.toString(),
            '"}]'
        );

        string memory uri = string.concat(
            '{"name":"',
            character.actor.name,
            '","description":"',
            "Autarch player character",
            '","image":"',
            svgImage,
            '","attributes":',
            attributes,
            "}"
        );

        return
            string.concat(
                "data:application/json;base64,",
                Base64.encode(bytes(uri))
            );
    }

    function mint(string memory _name, uint256 _classIndex) external returns (uint256 tokenId) {
        _totalCharacters++;
        tokenId = _totalCharacters;

        _characters[tokenId] = Character({
            actor: Actor({
                name: _name,
                stats: classes[_classIndex].stats
            }),
            classIndex: _classIndex
        });

        _mint(msg.sender, tokenId);

        emit CharacterMinted(tokenId, _name, _classIndex);
    }
}
