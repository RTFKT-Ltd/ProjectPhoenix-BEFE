const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');
const config = require('../utils/config');
const { ethers } = require('ethers');
const { ERC721_ABI, ERC1155_ABI } = require('../utils/contracts');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

const DB_PATH = './data/users.json';

// Add RPC URL to environment variables
const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL);

// Helper function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to read/write database
async function readDB() {
  const data = await fs.readFile(DB_PATH, 'utf8');
  return JSON.parse(data);
}

async function writeDB(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

// Add this helper function for Ethereum address validation
function isValidEthereumAddress(address) {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// Register route
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const db = await readDB();
    
    // Check if email already exists
    if (db.users.some(user => user.email === email)) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = Date.now().toString();
    // Add user to database
    db.users.push({
      id: userId,
      email,
      password: hashedPassword
    });

    await writeDB(db);

    // Create and sign JWT
    const token = jwt.sign(
      { id: userId, email: email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const db = await readDB();
    const user = db.users.find(user => user.email === email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create and sign JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new protected route for updating wallet address
router.post('/update-wallet', authMiddleware, async (req, res) => {
console.log("Test")
  try {
    const { walletAddress } = req.body;
    const userId = req.user.id;

    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    // Validate Ethereum address format
    if (!isValidEthereumAddress(walletAddress)) {
      return res.status(400).json({ error: 'Invalid Ethereum wallet address format' });
    }

    const db = await readDB();
    const userIndex = db.users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if wallet address is already linked to another account
    const walletExists = db.users.some(user => 
      user.id !== userId && user.walletAddress === walletAddress
    );

    if (walletExists) {
      return res.status(400).json({ error: 'Wallet address is already linked to another account' });
    }

    // Update user's wallet address
    db.users[userIndex] = {
      ...db.users[userIndex],
      walletAddress
    };

    await writeDB(db);

    res.json({ 
      message: 'Wallet address updated successfully',
      walletAddress
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's wallet address
router.get('/wallet', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const db = await readDB();
    const user = db.users.find(user => user.id === userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ 
      walletAddress: user.walletAddress || null
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Example usage in a route
router.get('/contracts', authMiddleware, (req, res) => {
  res.json({
    characters: config.characterContracts,
    items: config.itemContracts
  });
});

// Add the new route
router.get('/nfts', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const db = await readDB();
    const user = db.users.find(user => user.id === userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.walletAddress) {
      return res.status(400).json({ error: 'No wallet address linked to account' });
    }

    const nfts = {
      characters: [],
      items: []
    };

    // Check character NFTs
    for (const contract of config.characterContracts) {
      try {
        if (contract.type === 'ERC721') {
          const nftContract = new ethers.Contract(contract.address, ERC721_ABI, provider);
          const balance = await nftContract.balanceOf(user.walletAddress);
          for (let i = 0; i < balance; i++) {
            const tokenId = await nftContract.tokenOfOwnerByIndex(user.walletAddress, i);
            nfts.characters.push({
              contractAddress: contract.address,
              contractName: contract.name,
              tokenId: tokenId.toString(),
              type: 'ERC721'
            });
          }
        } else if (contract.type === 'ERC1155') {
          const nftContract = new ethers.Contract(contract.address, ERC1155_ABI, provider);
          const { start, end } = contract.tokenIdRange;
          const batchSize = 100;
          
          for (let startId = start; startId <= end; startId += batchSize) {
            const endId = Math.min(startId + batchSize - 1, end);
            const length = endId - startId + 1;
            const ids = Array.from({ length }, (_, i) => startId + i);
            const accounts = Array(length).fill(user.walletAddress);
            
            try {
              const balances = await nftContract.balanceOfBatch(accounts, ids);
              
              balances.forEach((balance, index) => {
                // Convert balance to BigNumber if it isn't already
                const balanceValue = ethers.getBigInt(balance.toString());
                if (balanceValue > 0n) { // Compare with BigInt zero
                  nfts.characters.push({
                    contractAddress: contract.address,
                    contractName: contract.name,
                    tokenId: (startId + index).toString(),
                    balance: balanceValue.toString(),
                    type: 'ERC1155'
                  });
                }
              });
            } catch (error) {
              console.error(`Error checking batch ${startId}-${endId} for ${contract.name}:`, error);
            }
          }
        }
      } catch (error) {
        console.error(`Error fetching NFTs from contract ${contract.name} (${contract.address}):`, error);
      }
    }

    // Check item NFTs (similar structure)
    for (const contract of config.itemContracts) {
      try {
        if (contract.type === 'ERC721') {
          // Same as above for ERC721
        } else if (contract.type === 'ERC1155') {
          const nftContract = new ethers.Contract(contract.address, ERC1155_ABI, provider);
          const { start, end } = contract.tokenIdRange;
          const batchSize = 100;
          
          for (let startId = start; startId <= end; startId += batchSize) {
            const endId = Math.min(startId + batchSize - 1, end);
            const length = endId - startId + 1;
            const ids = Array.from({ length }, (_, i) => startId + i);
            const accounts = Array(length).fill(user.walletAddress);
            
            try {
              const balances = await nftContract.balanceOfBatch(accounts, ids);
              
              balances.forEach((balance, index) => {
                // Convert balance to BigNumber if it isn't already
                const balanceValue = ethers.getBigInt(balance.toString());
                if (balanceValue > 0n) { // Compare with BigInt zero
                  nfts.items.push({
                    contractAddress: contract.address,
                    contractName: contract.name,
                    tokenId: (startId + index).toString(),
                    balance: balanceValue.toString(),
                    type: 'ERC1155'
                  });
                }
              });
            } catch (error) {
              console.error(`Error checking batch ${startId}-${endId} for ${contract.name}:`, error);
            }
          }
        }
      } catch (error) {
        console.error(`Error fetching NFTs from contract ${contract.name} (${contract.address}):`, error);
      }
    }

    res.json(nfts);
  } catch (error) {
    console.error('Error checking NFTs:', error);
    res.status(500).json({ error: 'Error checking NFTs' });
  }
});

module.exports = router; 