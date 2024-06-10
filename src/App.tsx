import React from 'react';
import './App.css';
import VideoPlayer from './components/VideoPlayer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Player</h1>
        <VideoPlayer />
      </header>
    </div>
  );
}

export default App;
