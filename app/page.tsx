'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useSoundPlayer } from './hooks/useSoundPlayer';
import { useTransactionMonitor } from './hooks/useTransactionMonitor';
import { TransactionFeed } from './components/TransactionFeed';
import { VolumeControl } from './components/VolumeControl';
import dynamic from 'next/dynamic';
import { SoundCustomizer } from './components/SoundCustomizer';

const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton),
  { ssr: false }
);


export default function Home() {
  const { publicKey, connected } = useWallet();
  const { playSound } = useSoundPlayer();
  useTransactionMonitor();

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-white">
            🎵 Sonic Wallet
          </h1>
          <WalletMultiButton />
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto text-center">
          {!connected ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20">
              <div className="text-6xl mb-6">🎧</div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Hear Your Transactions
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Connect your wallet to experience Solana with sound
              </p>
              <div className="inline-block">
                <WalletMultiButton />
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20">
              <div className="text-6xl mb-6">✅</div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Wallet Connected!
              </h2>
              <p className="text-gray-300 text-sm mb-4 font-mono break-all">
                {publicKey?.toBase58()}
              </p>
              <p className="text-green-400 text-lg mb-8">
                Listening for transactions...
              </p>

              {/* Test Sound Buttons */}
              <div className="space-y-4">
                <p className="text-white text-sm mb-4">Test sounds:</p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => playSound('swap')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition"
                  >
                    🔄 Test Swap Sound
                  </button>
                  <button
                    onClick={() => playSound('transfer')}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
                  >
                    💸 Test Transfer Sound
                  </button>
                  <button
                    onClick={() => playSound('mint')}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition"
                  >
                    ✨ Test Mint Sound
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {connected && <TransactionFeed />}

        {/* Feature Preview */}
        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="text-3xl mb-3">💱</div>
            <h3 className="text-white font-semibold mb-2">Swap Sound</h3>
            <p className="text-gray-400 text-sm">
              Hear a satisfying whoosh when you trade tokens
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="text-3xl mb-3">💸</div>
            <h3 className="text-white font-semibold mb-2">Transfer Sound</h3>
            <p className="text-gray-400 text-sm">
              Classic cha-ching for sending SOL
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="text-3xl mb-3">✨</div>
            <h3 className="text-white font-semibold mb-2">Mint Sound</h3>
            <p className="text-gray-400 text-sm">
              Magical sparkle when minting NFTs
            </p>
          </div>
        </div>
      </div>
      <SoundCustomizer />
      <VolumeControl />
    </main>
  );
}