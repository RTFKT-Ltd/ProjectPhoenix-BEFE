function parseContractAddresses(envVar) {
  if (!envVar) return [];
  
  const contracts = envVar.split(',').map(contract => {
    const parts = contract.trim().split(':');
    const [address, type, name, idRange] = parts;
    
    if (!address || !type || !name) {
      console.warn(`Invalid contract format: ${contract}. Expected format: address:type:name[:startId-endId for ERC1155]`);
      return null;
    }
    
    if (!['ERC721', 'ERC1155'].includes(type)) {
      console.warn(`Invalid contract type: ${type}. Must be ERC721 or ERC1155`);
      return null;
    }
    
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      console.warn(`Invalid contract address format: ${address}`);
      return null;
    }

    let tokenIdRange = { start: 0, end: 999 }; // Default range
    
    if (type === 'ERC1155') {
      if (!idRange) {
        console.warn(`No ID range specified for ERC1155 contract ${name}, using default range 0-999`);
      } else {
        const [start, end] = idRange.split('-').map(Number);
        if (isNaN(start) || isNaN(end) || start > end) {
          console.warn(`Invalid ID range for contract ${name}, using default range 0-999`);
        } else {
          tokenIdRange = { start, end };
        }
      }
    }
    
    return { 
      address, 
      type, 
      name,
      tokenIdRange
    };
  }).filter(Boolean);
  
  return contracts;
}

const config = {
  characterContracts: parseContractAddresses(process.env.CHARACTER_CONTRACTS),
  itemContracts: parseContractAddresses(process.env.ITEM_CONTRACTS),
  
  isValidContract(address) {
    return this.characterContracts.some(c => c.address === address) || 
           this.itemContracts.some(c => c.address === address);
  },
  
  isCharacterContract(address) {
    return this.characterContracts.some(c => c.address === address);
  },
  
  isItemContract(address) {
    return this.itemContracts.some(c => c.address === address);
  },

  getContractType(address) {
    const character = this.characterContracts.find(c => c.address === address);
    if (character) return character.type;
    
    const item = this.itemContracts.find(c => c.address === address);
    if (item) return item.type;
    
    return null;
  }
};

module.exports = config; 