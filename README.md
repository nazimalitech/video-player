# Video Player

A React-based video player that plays multiple videos sequentially, providing the experience of playing a single continuous video. The player supports play/pause functionality, seeking within the video, and displays the current playback time.

## Features

- **Sequential Video Playback**: Automatically plays multiple videos in sequence based on their timestamps.
- **Play/Pause Control**: Toggle between playing and pausing the video.
- **Seek Bar**: Allows users to seek to any point in the total video duration.
- **Current Playtime Display**: Shows the current playback time.
- **Buffering Indicator**: Displays a loading spinner when buffering.

## Technologies Used

- React
- TypeScript
- FontAwesome for icons
- CSS for styling

## Installation

1. **Clone the repository:**
   ```bash
   git clone git@github.com:your-username/video-player.git
   cd video-player

2. **Install dependencies:**
   ```bash
   npm install

3. **Run the development server:**
   ```bash
   npm start

## Usage

- Load the application in your browser. The video player will read the provided JSON file containing video data and display the videos sequentially.
- Use the play/pause button to control playback.
- Use the seek bar to jump to any point in the video.
- The current playback time is updated in real-time.

## Project Structure

- **src/components**: Contains React components including VideoPlayer, PlayPauseButton, SeekBar, and PlayTime.
- **src/videoData.json**: JSON file containing video metadata.

## Acknowledgements

- [FontAwesome](https://fontawesome.com/) for icons.
- [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/) for the development framework.
