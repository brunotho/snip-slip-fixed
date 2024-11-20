import React, { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import SnippetsGame from './SnippetsGame';
import GameOver from './GameOver';

function MainComponent({ gameSessionId = null }) {
  const [gameData, setGameData] = useState({});
  const [gameMode, setGameMode] = useState(null);

  const getView = () => {
    if (!gameSessionId && Object.keys(gameData).length === 0) {
      return 'home';
    }

    if (gameData.playerGameOver) {
      return 'gameover';
    }

    return 'game';
  };

  useEffect(() => {
    if (gameSessionId) {
      fetch(`/game_sessions/${gameSessionId}.json`, {
        headers: {
          "Accept": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      })
        .then(response => response.json())
        .then(data => {
          setGameMode(Object.keys(data.players).length > 1 ? "multi" : "single");
        })
        .catch(error => {
          console.error("Error fetching game sessions details:", error);
        });
    }
  }, [gameSessionId]);

  const currentView = getView();

  return (
    <div>
      {currentView === 'home' && (
          <HeroSection onPlay={() => {
            setGameMode('quick');
            setGameData({ status: true });
          }}
        />
      )}

      {currentView === 'game' && (
        <SnippetsGame
          game_session_id={gameSessionId}
          gameMode={gameMode}
          gameData={gameData}
          setGameData={setGameData}
        />
      )}

      {currentView === 'gameover' && (
        <GameOver
          gameData={gameData}
          setGameData={setGameData}
        />
      )}
    </div>
  );
}

export default MainComponent;
