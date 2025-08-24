import { useRef } from 'react';

/**
 * Custom hook to manage audio playback.
 * @param {string} src - The source URL of the audio file.
 * @returns {object} { play, pause, audioRef }
 */
export default function useAudio(src) {
  const audioRef = useRef(null);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return { play, pause, audioRef };
}
