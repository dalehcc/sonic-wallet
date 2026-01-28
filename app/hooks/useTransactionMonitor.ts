'use client';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useRef } from 'react';
import { SoundType, useSoundPlayer } from './useSoundPlayer';

export function useTransactionMonitor() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const { playSound } = useSoundPlayer();
  const lastSignatureRef = useRef<string | null>(null);

  useEffect(() => {
    if (!publicKey) return;

    const checkTransactions = async () => {
      try {
        const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 1 });
        
        if (signatures.length > 0) {
          const latestSig = signatures[0].signature;
          
          // First run - just store signature, don't play sound
          if (!lastSignatureRef.current) {
            lastSignatureRef.current = latestSig;
            return;
          }

          // New transaction detected
          if (latestSig !== lastSignatureRef.current) {
            lastSignatureRef.current = latestSig;
            
            // Fetch transaction details
            const tx = await connection.getParsedTransaction(latestSig, {
              maxSupportedTransactionVersion: 0
            });

            // Determine transaction type and play sound
            const soundType = detectTransactionType(tx);
            if (soundType) {
              playSound(soundType);
            }
          }
        }
      } catch (error) {
        console.error('Transaction monitoring error:', error);
      }
    };

    // Check every 3 seconds
    const interval = setInterval(checkTransactions, 10_000);
    checkTransactions(); // Initial check

    return () => clearInterval(interval);
  }, [publicKey, connection, playSound]);
}

// Helper to detect transaction type
function detectTransactionType(tx: any): SoundType | null {
  if (!tx) return null;

  const instructions = tx.transaction.message.instructions;
  
  // Check for common instruction types
  for (const ix of instructions) {
    const programId = ix.programId?.toString();
    
    // Token swap (Jupiter, Raydium, etc)
    if (programId?.includes('JUP') || programId?.includes('675kPX9')) {
      return 'swap';
    }
    
    // NFT mint (Metaplex)
    if (programId?.includes('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')) {
      return 'mint';
    }
    
    // SOL transfer (system program)
    if (programId === '11111111111111111111111111111111') {
      return 'transfer';
    }
  }

  // Default to transfer for unknown types
  return 'transfer';
}