'use client';

import { useState } from 'react';
import { SoundType } from '../hooks/useSoundPlayer';

export function SoundCustomizer() {
  const [isOpen, setIsOpen] = useState(false);

  const handleFileUpload = (type: SoundType, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      alert('Please upload an audio file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File too large (max 5MB)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      localStorage.setItem(`custom_${type}`, base64);
      alert(`${type} sound updated! Refresh to apply.`);
    };
    reader.readAsDataURL(file);
  };

  const resetSound = (type: SoundType) => {
    localStorage.removeItem(`custom_${type}`);
    alert(`${type} sound reset to default! Refresh to apply.`);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-32 right-8 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition mb-4"
      >
        🎨 Customize Sounds
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 right-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 w-80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-semibold">Custom Sounds</h3>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
          ✕
        </button>
      </div>

      <div className="space-y-4">
        {(['swap', 'transfer', 'mint'] as SoundType[]).map(type => (
          <div key={type} className="bg-white/5 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white capitalize">{type}</span>
              <button
                onClick={() => resetSound(type)}
                className="text-xs text-gray-400 hover:text-white"
              >
                Reset
              </button>
            </div>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => handleFileUpload(type, e)}
              className="text-xs text-gray-300 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:bg-purple-500 file:text-white file:cursor-pointer hover:file:bg-purple-600"
            />
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-4">
        Upload MP3/WAV files (max 5MB). Refresh page after upload.
      </p>
    </div>
  );
}