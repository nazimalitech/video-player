import React, { useEffect, useRef, useState } from 'react';
import videoData from '../videoData.json';
import aiLabelData from '../test.json';
import PlayPauseButton from './PlayPauseButton';
import SeekBar from './SeekBar';
import PlayTime from './PlayTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './VideoPlayer.module.css';

interface VideoRecording {
  id: number;
  startTimestamp: number;
  endTimestamp: number;
  url: string;
}

interface Value {
  action: string;
  accuracy: number;
}

const VideoPlayer: React.FC = () => {
  const [recordings] = useState<VideoRecording[]>(videoData.recordings);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playTime, setPlayTime] = useState<number>(0);
  const [buffering, setBuffering] = useState<boolean>(true);
  const videoRefs = useRef<(HTMLVideoElement)[]>([]);
  const startTimestamp = recordings[0].startTimestamp;
  const [actionName, setActionName] = useState<string>('');
  const [accuracy, setAccuracy] = useState<number>(0);
  const labelMap = useRef<Map<number, Value>>(new Map());

  const totalDuration = recordings.reduce((acc, video) => {
    const seconds = (video.endTimestamp - video.startTimestamp) / 1000;
    return acc + Math.round(seconds);
  }, 0);

  useEffect(() => {
    if (isPlaying && videoRefs.current[currentVideoIndex]) {
      videoRefs.current[currentVideoIndex]?.play();
    } else if (videoRefs.current[currentVideoIndex]) {
      videoRefs.current[currentVideoIndex]?.pause();
    }
    const entries = Object.entries(aiLabelData);
    for (let [key, values] of entries) {
      for (let i=0; i<values.length; i++) {
        const value = { action: key, accuracy: values[i].accuracy };
        labelMap.current.set(values[i].timestamp, value);
      }
    }
  }, [isPlaying, currentVideoIndex]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleCanPlayThrough = () => {
    setBuffering(false);
  };

  const handleVideoEnd = () => {
    setBuffering(true);
    if (currentVideoIndex < recordings.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      setBuffering(false);
    }
    else {
      setCurrentVideoIndex(0);
      setIsPlaying(false);
      setPlayTime(0);
      setBuffering(false);
    }
  };

  const handleTimeUpdate = (e: any) => {
    const currentTime = Math.round(e.target.currentTime);

    const previousVideosDuration = recordings.slice(0, currentVideoIndex).reduce((acc, video) => {
      const seconds = (video.endTimestamp - video.startTimestamp) / 1000;
      return acc + Math.round(seconds);
    }, 0);

    const timeElapsed = previousVideosDuration + currentTime;
    setPlayTime(timeElapsed);
    
    const timeStampElapsed = timeElapsed * 1000;
    for (const timestamp of Array.from(labelMap.current.keys())) {
      if (startTimestamp + timeStampElapsed > timestamp) {
        const value = labelMap.current.get(timestamp);
        if (value) {
          setActionName(value.action);
          setAccuracy(value.accuracy);
          labelMap.current.delete(timestamp);
        }
      }
    }
  };

  const handleSeek = (time: number) => {
    let cumulativeTime = 0;
    for (let i = 0; i < recordings.length; i++) {
      const videoDuration = (recordings[i].endTimestamp - recordings[i].startTimestamp) / 1000;
      if (time < cumulativeTime + videoDuration) {
        setCurrentVideoIndex(i);
        if (videoRefs.current[i]) {
          videoRefs.current[i].currentTime = time - cumulativeTime;
        }
        setPlayTime(time);
        break;
      } else {
        cumulativeTime += videoDuration;
      }
    }
  };

  return (
    <div className={styles.videoPlayerContainer}>
      {buffering && (
        <div className={styles.bufferingOverlay}>
          <FontAwesomeIcon icon={faSpinner} spin size="3x" color="white" />
        </div>
      )}
      <div className={styles.videoWrapper}>
        {recordings.map((recording, index) => (
          <video
            key={recording.id}
            ref={el => el ? videoRefs.current[index] = el : null}
            width="854"
            height="480"
            controls={false}
            src={recording.url}
            className={`${styles.videoElement} ${index === currentVideoIndex ? styles.videoVisible : styles.videoHidden}`}
            onCanPlayThrough={handleCanPlayThrough}
            onEnded={handleVideoEnd}
            onTimeUpdate={e => handleTimeUpdate(e)}
          />
        ))}
      </div>
      <div className={styles.controlsContainer}>
        <PlayPauseButton
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
        />
        <SeekBar
          totalDuration={totalDuration}
          playTime={playTime}
          onSeek={handleSeek}
        />
        <PlayTime
          playTime={playTime}
          totalDuration={totalDuration}
        />
        {actionName !== '' && (
          <div>AI Label: {actionName} - {accuracy}%</div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;