import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import styles from './PlayPauseButton.module.css';

interface PlayPauseButtonProps {
  isPlaying: boolean;
  onPlayPause: () => void;
}

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({ isPlaying, onPlayPause }) => {
  return (
    <button onClick={onPlayPause} className={styles.button}>
      <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="2x" color='white' />
    </button>
  );
};

export default PlayPauseButton;