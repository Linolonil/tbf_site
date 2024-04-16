import { useState, useEffect } from 'react';
import './musicaIntro.module.css';
import musica from '../../../public/music/intro.mp3';

// eslint-disable-next-line react/prop-types
function MusicPlayer({ startMusic }) {
  const [audio] = useState(new Audio(musica));

  useEffect(() => {
    if (startMusic) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [startMusic, audio]);

  return <></>;
}

export default MusicPlayer;
