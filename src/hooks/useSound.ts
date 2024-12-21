import { Howl } from 'howler';
import { useCallback, useEffect, useMemo } from 'react';
import { useSettingsStore } from '../store/settingsStore';

export const useGameSound = () => {
  const { soundEnabled } = useSettingsStore();

  const sounds = useMemo(() => ({
    win: new Howl({ src: ['/sounds/win.mp3'] }),
    lose: new Howl({ src: ['/sounds/lose.mp3'] }),
    click: new Howl({ src: ['/sounds/click.mp3'] }),
    shuffle: new Howl({ src: ['/sounds/shuffle.mp3'] }),
    spin: new Howl({ src: ['/sounds/spin.mp3'] }),
  }), []);

  const playSound = useCallback((soundName: keyof typeof sounds) => {
    if (soundEnabled) {
      sounds[soundName].play();
    }
  }, [soundEnabled, sounds]);

  useEffect(() => {
    return () => {
      Object.values(sounds).forEach(sound => sound.unload());
    };
  }, [sounds]);

  return playSound;
};