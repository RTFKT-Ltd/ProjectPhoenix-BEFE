const ERC721_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)',
];

const ERC1155_ABI = [
  'function balanceOf(address account, uint256 id) view returns (uint256)',
  'function balanceOfBatch(address[] accounts, uint256[] ids) view returns (uint256[])',
  // Optional: Include if your contracts support this
  'event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)',
  'event TransferBatch(address indexed operator, address indexed from, address indexed to, uint256[] ids, uint256[] values)'
];

// Helper function to detect contract type
async function detectContractType(address, provider) {
  try {
    const contract = new ethers.Contract(address, ['function supportsInterface(bytes4) view returns (bool)'], provider);
    const isERC1155 = await contract.supportsInterface('0xd9b67a26'); // ERC1155 interface id
    const isERC721 = await contract.supportsInterface('0x80ac58cd'); // ERC721 interface id
    return { isERC1155, isERC721 };
  } catch (error) {
    console.error(`Error detecting contract type for ${address}:`, error);
    return { isERC1155: false, isERC721: true }; // Default to ERC721 if detection fails
  }
}

module.exports = {
  ERC721_ABI,
  ERC1155_ABI,
  detectContractType
}; 