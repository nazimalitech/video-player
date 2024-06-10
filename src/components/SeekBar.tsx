import React from 'react';

interface SeekBarProps {
  totalDuration: number;
  playTime: number;
  onSeek: (time: number) => void;
}

const SeekBar: React.FC<SeekBarProps> = ({ totalDuration, playTime, onSeek }) => {
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSeek(Number(e.target.value));
  };

  return (
    <input
      type="range"
      min="0"
      max={totalDuration}
      value={playTime}
      onChange={handleSeekChange}
      style={{ width: '65%', cursor: 'pointer' }}
    />
  );
};

export default SeekBar;