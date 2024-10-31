import React, { useState } from 'react';
import HeroSection from './HeroSection';
import SnippetsGame from './SnippetsGame';

function MainComponent() {
  const [gameStarted, setGameStarted] = useState(false);
  const [snippetCompleted, setSnippetCompleted] = useState(false);

  const handlePlay = () => {
    setGameStarted(true);
    setSnippetCompleted(false);
  };

  const handleSnippetCompletion = () => {
    setGameStarted(false);
    setSnippetCompleted(true);
  };

  return (
    <div>
      {!gameStarted && !snippetCompleted && (
        <HeroSection onPlay={handlePlay} />
      )}
      {gameStarted && (
        <SnippetsGame onSnippetComplete={handleSnippetCompletion} />
      )}
      {!gameStarted && snippetCompleted && (
        <HeroSection onPlay={handlePlay} />
      )}
    </div>
  );
}

export default MainComponent;
