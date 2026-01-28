'use client';

import { useState, useEffect } from 'react';

export function VolumeControl() {
  const [volume, setVolume] = useState(50);

  // Load saved volume on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sonicVolume');
      if (saved) setVolume(Number(saved));
    }
  }, []);

  const handleVolumeChange = (val: number) => {
    setVolume(val);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sonicVolume', val.toString());
      // Trigger storage event for other components
      window.dispatchEvent(new Event('sonic-volume-change'));
    }
  };

  return (
    <div className="fixed bottom-8 right-8 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
      <div className="flex items-center gap-3">
        <span className="text-2xl">
          {volume === 0 ? '🔇' : volume > 50 ? '🔊' : '🔉'}
        </span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => handleVolumeChange(Number(e.target.value))}
          className="w-24 accent-purple-500"
        />
        <span className="text-white text-sm w-8">{volume}%</span>
      </div>
    </div>
  );
}