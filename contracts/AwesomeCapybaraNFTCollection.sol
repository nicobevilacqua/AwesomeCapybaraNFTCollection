//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import { Base64 } from "./libraries/Base64.sol";

contract AwesomeCapybaraNFTCollection is ERC721URIStorage {

  address private owner;

  string private constant NAME_PREFIX = "Awesome Capybara NFT Collection Number: ";
  string private constant DESCRIPTION_PREFIX = "Collection Item Number: ";

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  struct AvailableItem {
    string name;
    string description;
    string image;
  }

  AvailableItem[] private availableItems;

  constructor() ERC721("AwesomeCapybaraNFTCollection", "CAPY") {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "only owner is allowed");
    _;
  }

  event TokenMinted(address from, uint256 token, uint256 timestamp);
  event ItemAdded(string title, string description, string image, uint256 timestamp);

  function _random(string memory _input) internal pure returns (uint256) {
    return uint256(keccak256(abi.encodePacked(_input)));
  }

  function _pickAvailableItem(uint256 _position) internal returns (AvailableItem memory) {
    AvailableItem memory pickedItem = availableItems[_position];
    
    // remove picked image and fill the gap with last image in array
    availableItems[_position] = availableItems[availableItems.length - 1];
    availableItems.pop();

    return pickedItem;
  }

  function _pickRandomAvailableItem(uint256 newItemId) internal returns(AvailableItem memory) {
    uint256 rand = _random(string(abi.encodePacked(block.number, block.timestamp, msg.sender, newItemId)));
    
    rand = rand % availableItems.length;

    AvailableItem memory item = _pickAvailableItem(rand);

    return item;
  }

  function _getTokenName(string memory name, uint256 tokenId) private pure returns (string memory) {
    string memory tokenName = string(abi.encodePacked(NAME_PREFIX, Strings.toString(tokenId), " - ", name));
    return tokenName;
  }

  function _getTokenDescription(string memory description, uint256 tokenId) private pure returns (string memory) {
    string memory tokenDescription = string(abi.encodePacked(DESCRIPTION_PREFIX, Strings.toString(tokenId), " - ", description));
    return tokenDescription;
  }

  function mintNFT() public {
    require(availableItems.length > 0, "There is no available items");

    uint256 newTokenId = _tokenIds.current();
    
    _safeMint(msg.sender, newTokenId);

    AvailableItem memory availableItem = _pickRandomAvailableItem(newTokenId);
 
    string memory tokenName = _getTokenName(availableItem.name, newTokenId);
    string memory tokenDescription = _getTokenDescription(availableItem.description, newTokenId);

    string memory json = Base64.encode(
      bytes(
        string(
          abi.encodePacked(
            '{"name": "', tokenName, '", "description": "', tokenDescription, '", "image": "', availableItem.image, '"}'
          )
        )
      )
    );

    string memory token = string(abi.encodePacked("data:application/json;base64,", json));

    _setTokenURI(newTokenId, token);
    
    _tokenIds.increment();

    emit TokenMinted(msg.sender, newTokenId, block.timestamp);
  }

  function addItemToCollection(string calldata name, string calldata description, string calldata image) public onlyOwner {
    availableItems.push(AvailableItem({
      name: name,
      description: description,
      image: image
    }));

    emit ItemAdded(name, description, image, block.timestamp);
  }

  function collectionSize() public view returns (uint256) {
    return _tokenIds.current() + availableItems.length;
  }

  function availableItemsLength() public view returns(uint256) {
    return availableItems.length;
  }
}