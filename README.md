# 🎵 Sonic Wallet

**Hear Your Solana Transactions**

Built for the Trends.fun x Solana Vibe Coding Hackathon

[🔗 Live Demo](https://sonic-wallet-sigma.vercel.app)

---

## 🎯 What is Sonic Wallet?

Sonic Wallet adds an audio layer to Solana transactions, making every swap, transfer, and mint memorable through unique sound signatures. Instead of silent blockchain interactions, you get real-time audio feedback that makes Web3 feel alive.

---

## ✨ Features

- **🔊 Real-time Audio Feedback** - Every transaction type has its own signature sound
- **🎨 Custom Sound Uploads** - Upload your own MP3 files to personalize the experience
- **📜 Transaction History** - Visual feed of recent transactions with sound indicators
- **🎚️ Volume Control** - Adjustable volume with persistent settings
- **🔗 Universal Compatibility** - Works with any Solana wallet (Phantom, Backpack, Solflare, etc.)

---

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Blockchain:** Solana (Devnet/Mainnet)
- **Wallet Integration:** @solana/wallet-adapter
- **Audio:** Web Audio API + Tone.js
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

---

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/dalehcc/sonic-wallet.git
cd sonic-wallet

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Project Structure

```
sonic-wallet/
├── app/
│   ├── components/
│   │   ├── SoundCustomizer.tsx    # Custom sound upload UI
│   │   ├── TransactionFeed.tsx    # Transaction history display
│   │   └── VolumeControl.tsx      # Volume adjustment controls
│   ├── hooks/
│   │   ├── useSoundPlayer.ts      # Audio playback logic
│   │   └── useTransactionMonitor.ts # Real-time tx detection
│   ├── providers/
│   │   └── WalletProvider.tsx     # Solana wallet setup
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── sounds/
│       ├── swap.mp3               # Default swap sound
│       ├── transfer.mp3           # Default transfer sound
│       └── mint.mp3                # Default mint sound
└── package.json
```

---

## 🎮 How It Works

1. **Connect Wallet** - Use any Solana wallet adapter
2. **Transaction Detection** - Monitors your wallet address for new transactions
3. **Sound Mapping** - Identifies transaction type (swap/transfer/mint)
4. **Audio Playback** - Plays corresponding sound with user-configured volume
5. **History Display** - Shows recent transactions with visual indicators

---

## 🎨 Customization

Users can upload custom sounds via the "Customize Sounds" panel:
- Supports MP3/WAV formats
- Max file size: 5MB per sound
- Stored locally in browser (localStorage)
- Reset to defaults anytime

---

## 🔮 Future Ideas

- Sound packs marketplace
- NFT-based custom sounds
- Social sharing of sound profiles
- AI-generated transaction soundscapes
- Wallet performance "songs" (replay your trading day as music)

---

## 📄 License

MIT License

