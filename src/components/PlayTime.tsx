import React from 'react';

interface PlayTimeProps {
  playTime: number;
  totalDuration: number;
}

const PlayTime: React.FC<PlayTimeProps> = ({ playTime, totalDuration }) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      Play Time: {formatTime(playTime)} / {formatTime(totalDuration)}
    </>
  );
};

export default PlayTime;