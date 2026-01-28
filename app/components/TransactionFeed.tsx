'use client';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { SoundType } from '../hooks/useSoundPlayer';

type Transaction = {
  signature: string;
  timestamp: number;
  type: SoundType;
};

export function TransactionFeed() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!publicKey) return;

    const fetchTransactions = async () => {
      try {
        const sigs = await connection.getSignaturesForAddress(publicKey, { limit: 3 });
        
        const txs = await Promise.all(
          sigs.map(async (sig) => {
            const tx = await connection.getParsedTransaction(sig.signature, {
              maxSupportedTransactionVersion: 0
            });
            
            return {
              signature: sig.signature,
              timestamp: sig.blockTime || 0,
              type: detectType(tx)
            };
          })
        );

        setTransactions(txs);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchTransactions();
    const interval = setInterval(fetchTransactions, 20_000);
    return () => clearInterval(interval);
  }, [publicKey, connection]);

  if (!publicKey) return null;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h3 className="text-white text-xl font-semibold mb-4">Recent Transactions</h3>
      <div className="space-y-2">
        {transactions.map((tx) => (
          <div
            key={tx.signature}
            className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="text-2xl">
                {tx.type === 'swap' && '🔄'}
                {tx.type === 'transfer' && '💸'}
                {tx.type === 'mint' && '✨'}
              </div>
              <div>
                <p className="text-white font-mono text-sm">
                  {tx.signature.slice(0, 8)}...{tx.signature.slice(-8)}
                </p>
                <p className="text-gray-400 text-xs">
                  {new Date(tx.timestamp * 1000).toLocaleString()}
                </p>
              </div>
            </div>
            <a
              href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              View →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function detectType(tx: any): SoundType {
  if (!tx) return 'transfer';
  
  const instructions = tx.transaction.message.instructions;
  
  for (const ix of instructions) {
    const programId = ix.programId?.toString();
    if (programId?.includes('JUP') || programId?.includes('675kPX9')) return 'swap';
    if (programId?.includes('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')) return 'mint';
  }
  
  return 'transfer';
}