<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg" alt="Ethereum Logo" width="80"/>
  <img src="https://img.logo.dev/metamaskgrants.org?token=live_6a1a28fd-6420-4492-aeb0-b297461d9de2&size=128&retina=false&format=png&theme=dark" alt="MetaMask Logo" width="80"/>
  <img src="https://not-lain-background-removal.hf.space/gradio_api/file=/tmp/gradio/78658d854db2e1346dbc1adc8f6af67833a356ec7159a75524e3c8a8bc1a4ab0/image.png" alt="Solidity Logo" width="80"/>
</p>


# **Task2Do - Ethereum Smart Contract Deployment**

App : https://ethtask2do.netlify.app/

> **v3.0** - Successfully deployed on Sepolia ETH testnet

## 📋 Overview

Task2Do is a Solidity-based smart contract project for Ethereum blockchain development. The v3.0 release marks a successful deployment milestone on the Sepolia testnet network with the transfer form Ganache to Sepolia testnet.

**Release Date:** February 28, 2026

## 🏗️ Project Setup

### Tech Stack
- **Workspace:** RemixIDE & VSCode
- **Wallet:** Metamask
- **Network:** Sepolia Testnet
- **Blockchain:** Ethereum
- **Language:** Solidity (70%) || Javascript (30%)


## 📦 Project Structure

```
├── 📁 contracts
│   ├── 📄 Migrations.sol
│   └── 📄 to_do_list.sol
├── 📁 migrations
│   ├── 📄 1_initial_migration.js
│   └── 📄 2_deploy_contract.js
├── 📁 src
│   ├── ⚙️ TodoList.json
│   ├── 📄 app.js
│   └── 🌐 index.html
├── 📁 test
│   └── 📄 test.js
├── ⚙️ .gitignore
├── ⚙️ bs-config.json
├── ⚙️ package-lock.json
├── ⚙️ package.json
└── 📄 truffle-config.js
```

## 🚀 Getting Started Guide

### Prerequisites
Before you begin, make sure you have the following installed:
- **MetaMask** wallet extension

---

### 1️⃣ Install MetaMask Extension

MetaMask is your gateway to Web3. Download and install it on your browser.

**Steps:**
1. Visit the [MetaMask download page](https://metamask.io/download/)
2. Select your browser (Chrome, Firefox, Edge, etc.)
3. Click "Install MetaMask"
4. Complete the installation and pin the extension to your toolbar

> 🔑 **Important:** Create or import a wallet and **securely save your seed phrase**. Never share it with anyone!

---

### 2️⃣ Switch to Sepolia Test Network

Your app runs on the **Sepolia Testnet**. Let's configure MetaMask to use it.

**Steps:**
1. Open MetaMask
2. Click the **Network Dropdown** (top-left)
3. Select **Sepolia Test Network**

**Can't see Sepolia?**
- Go to **Settings** → **Advanced**
- Enable **"Show test networks"**
- Return to the network dropdown and select **Sepolia**

> 💡 Sepolia is a free test network perfect for development and testing!

---

### 3️⃣ Get Sepolia Test ETH (Free)

You'll need test ETH to pay for gas fees on transactions. Don't worry—it's free!

**Steps:**
1. Copy your wallet address from MetaMask
2. Visit the [Sepolia Faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
3. Paste your wallet address
4. Click "Request ETH"
5. Wait 10–30 seconds for the ETH to arrive

> ⏱️ If it takes longer, refresh MetaMask or check the transaction status on [Sepolia Etherscan](https://sepolia.etherscan.io/)

---

### 4️⃣ Connect Your Wallet

Now let's connect your MetaMask wallet to the app.

**Steps:**
1. Open the app in your browser
2. Click the **"Connect MetaMask"** button
3. A MetaMask popup will appear
4. Review the permissions and click **"Connect"**
5. Your wallet address should now display on screen

> ✅ If prompted to switch networks, approve the request to connect to Sepolia.

---

### 5️⃣ Launch the App

Ready to go? Let's start exploring!

**The app will:**
- ✔️ Connect to the smart contract
- ✔️ Load your tasks from the blockchain
- ✔️ Display active and completed tasks
- ✔️ Enable real-time UI updates

---

### 6️⃣ Create Your First Task

Let's add a task to the blockchain.

**Steps:**
1. Enter your task description in the input field
2. Click **"Add Task"**
3. MetaMask will prompt you to confirm the transaction
4. Review the gas fee and click **"Confirm"**
5. Wait a few seconds for the transaction to complete

> ⛽ Gas fees are paid in **Sepolia ETH** (testnet only—it's free!)

Your task will now appear and be permanently recorded on the blockchain! 🎉

---

### 7️⃣ Complete a Task

Mark tasks as done with a single click.

**Steps:**
1. Click the **checkbox** next to any task
2. Confirm the transaction in MetaMask
3. The task will move to **"Completed Quests"**
4. Everything is permanently recorded on-chain

> 🔒 Your task data is immutable and verifiable on the blockchain!

---

### 🎯 You're All Set!

Congratulations! 🎊 You've just created your own **private, secure, and decentralized task manager** on the Ethereum Sepolia Testnet!

---

## ⚠️ Troubleshooting

### ❌ Wallet Not Connecting
- ✓ Ensure MetaMask is installed and enabled
- ✓ Refresh the page
- ✓ Verify you clicked **"Approve"** in the MetaMask popup
- ✓ Check that pop-ups are not blocked

### ❌ Wrong Network Error
- ✓ Switch to **Sepolia Test Network** in MetaMask
- ✓ Refresh the app

### ❌ Transaction Fails
- ✓ Ensure you have **Sepolia ETH** in your wallet
- ✓ Check your gas balance in MetaMask
- ✓ Try again with a higher gas limit (if needed)

### ❌ Task Not Appearing
- ✓ Wait a few more seconds—blockchain transactions take time
- ✓ Refresh the page
- ✓ Check [Sepolia Etherscan](https://sepolia.etherscan.io/) to verify the transaction went through

---

## ✨ What Makes This Special?

| Feature | Description |
|---------|-------------|
| 🔓 **Fully Decentralized** | No central server, pure blockchain |
| 💾 **On-Chain Storage** | All tasks stored permanently on Ethereum |
| ⚡ **Event-Driven** | Real-time UI updates on blockchain events |
| 🔍 **Publicly Verifiable** | Audit all transactions on Etherscan |
| 🛡️ **Secure & Private** | Only you control your data |

---

## 🛠️ Tech Stack

- **Smart Contracts:** Solidity
- **Development Framework:** Truffle
- **Web3 Integration:** Web3.js
- **Wallet:** MetaMask
- **Testnet:** Ethereum Sepolia
- **Hosting:** Netlify (static)

---

## 📚 Need Help?

- [MetaMask Documentation](https://docs.metamask.io/)
- [Sepolia Testnet Info](https://www.alchemy.com/overviews/sepolia-testnet)
- [Web3.js Documentation](https://docs.web3js.org/)

---
