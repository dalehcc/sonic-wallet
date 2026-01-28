'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type SoundType = 'swap' | 'transfer' | 'mint';

export function useSoundPlayer() {
  const audioRefs = useRef<{ [key in SoundType]?: HTMLAudioElement }>({});
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sonicVolume');
      if (saved) setVolume(Number(saved) / 100);
    }
  }, []);

  useEffect(() => {
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) audio.volume = volume;
    });
  }, [volume]);

  const playSound = useCallback((type: SoundType) => {
    try {
      // Check for custom sound first
      const customSound = typeof window !== 'undefined' 
        ? localStorage.getItem(`custom_${type}`)
        : null;

      if (!audioRefs.current[type] || customSound) {
        const audioSrc = customSound || `/sounds/${type}.mp3`;
        const audio = new Audio(audioSrc);
        audio.volume = volume;
        audioRefs.current[type] = audio;
      }

      const audio = audioRefs.current[type];
      if (audio) {
        audio.currentTime = 0;
        audio.volume = volume;
        audio.play().catch(err => console.log('Audio play failed:', err));
      }
    } catch (error) {
      console.error('Sound error:', error);
    }
  }, [volume]);

  return { playSound, setVolume };
}