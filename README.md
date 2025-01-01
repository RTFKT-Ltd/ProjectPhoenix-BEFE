# Project Phoenix Backend & Frontend

A Web3-enabled application for managing NFT characters and items.

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git
- Ethereum wallet (MetaMask recommended)
- Access to Ethereum RPC URL (Alchemy or similar provider)

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/RTFKT-Ltd/ProjectPhoenix-BEFE.git
cd ProjectPhoenix-BEFE
```

### 2. Environment Setup
1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Configure your environment variables in `.env`:
   - Set your preferred `PORT` (default: 3111)
   - Set your `JWT_SECRET` for authentication
   - Configure `CHARACTER_CONTRACTS` for ERC721 NFTs
   - Configure `ITEM_CONTRACTS` for ERC1155 NFTs
   - Add your `ETH_RPC_URL` (Alchemy or other provider)

Example configuration:
```env
PORT=3111
JWT_SECRET=your-secret-key
CHARACTER_CONTRACTS=0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b:ERC721:CloneX
ITEM_CONTRACTS=0xb7be4001bff2c5f4a61dd2435e4c9a19d8d12343:ERC1155:RTFKTItems:0-1
ETH_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/your-api-key
```

### Contract Configuration Format

#### CHARACTER_CONTRACTS (ERC721)
Format: `address:type:name`
- `address`: Ethereum contract address
- `type`: Must be "ERC721"
- `name`: Display name for the collection

Example:
```
CHARACTER_CONTRACTS=0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b:ERC721:CloneX
```

#### ITEM_CONTRACTS (ERC1155)
Format: `address:type:name:startId-endId`
- `address`: Ethereum contract address
- `type`: Must be "ERC1155"
- `name`: Display name for the collection
- `startId-endId`: Range of token IDs to include

Multiple contracts can be specified using comma separation, in both the `CHARACTER_CONTRACTS` and `ITEM_CONTRACTS` variables.

Example:
```
ITEM_CONTRACTS=0xb7be4001bff2c5f4a61dd2435e4c9a19d8d12343:ERC1155:RTFKTItems:0-1,0x895554bc4F48fe1c2bf5C198bFA3513Da538f86b:ERC1155:Luxpod:1-2
```

### 3. Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

### 4. Start the Development Servers
```bash
# Start backend server (from root directory)
npm run dev

# Start frontend server (in frontend directory)
cd frontend
npm run dev
```

### 5. Access the Application
Once the development servers are running, you can access by writing the following in your browser:
```
http://localhost:3111
```

## Features
- Web3 wallet integration
- NFT character management (ERC721)
- Item management (ERC1155)
- JWT-based authentication
- Mobile-responsive design

## Available Scripts
### Backend
- `node server.js` - Starts the server

### Frontend (non compiled in /frontend directory)
- `npm run dev` - Starts the Vite development server
- `npm run build` - Creates a production build
- `npm run preview` - Preview the production build locally

## Need Help?
If you encounter any issues during setup or have questions, please:
1. Check the existing issues in the repository
2. Create a new issue at https://github.com/RTFKT-Ltd/ProjectPhoenix-BEFE/issues

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details
