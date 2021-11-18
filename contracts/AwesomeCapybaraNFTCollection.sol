// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import { Base64 } from "./libraries/Base64.sol";

contract AwesomeCapybaraNFTCollection is ERC721URIStorage {

  address private owner;

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  struct Item {
    string name;
    string description;
    string image;
  }

  string private contractName;
  string private contractDescription;
  string private contractImage;

  Item[] private availableItems;
  mapping(uint256 => Item) public tokensData;

  constructor(string memory _contractName, string memory _contractDescription, string memory _contractImage) ERC721("AwesomeCapybaraNFTCollection", "CAPY") {
    owner = msg.sender;

    contractName = _contractName;
    contractDescription = _contractDescription;
    contractImage = _contractImage;
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

  function _pickAvailableItem(uint256 _position) internal returns (Item memory) {
    Item memory pickedItem = availableItems[_position];
    
    // remove picked image and fill the gap with last image in array
    availableItems[_position] = availableItems[availableItems.length - 1];
    availableItems.pop();

    return pickedItem;
  }

  function _pickRandomAvailableItem(uint256 newItemId) internal returns(Item memory) {
    uint256 rand = _random(string(abi.encodePacked(block.number, block.timestamp, msg.sender, newItemId)));
    
    rand = rand % availableItems.length;

    Item memory item = _pickAvailableItem(rand);

    return item;
  }

  function _getEncodedUrl(string memory name, string memory description, string memory image) internal pure returns(string memory) {
    string memory json = Base64.encode(
      bytes(
        string(
          abi.encodePacked(
            '{"name": "', name, '", "description": "', description, '", "image": "', image, '"}'
          )
        )
      )
    );
    string memory encodedUrl = string(abi.encodePacked("data:application/json;base64,", json));
    return encodedUrl;
  }

  function mintNFT() public {
    require(availableItems.length > 0, "There is no available items");

    uint256 newTokenId = _tokenIds.current();
    
    _safeMint(msg.sender, newTokenId);

    tokensData[newTokenId] = _pickRandomAvailableItem(newTokenId);
    
    _tokenIds.increment();

    emit TokenMinted(msg.sender, newTokenId, block.timestamp);
  }

  function contractURI() public view returns (string memory) {
    string memory encodedContractURI = _getEncodedUrl(contractName, contractDescription, contractImage);
    return encodedContractURI;
  }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    require(_exists(tokenId), "ERC721URIStorage: URI query for nonexistent token");
    
    Item memory token = tokensData[tokenId];

    return _getEncodedUrl(token.name, token.description, token.image);
  }

  function addItemToCollection(string calldata name, string calldata description, string calldata image) public onlyOwner {
    availableItems.push(Item({
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
