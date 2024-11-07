import React, { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import SnippetsGame from './SnippetsGame';
import GameOver from './GameOver';

function MainComponent({ gameSessionId = null }) {
  console.log("MainComponent rendering with gameSessionId:", gameSessionId);
  console.log("🤡");
  console.log("update pls")
  console.log("🤡");



  const [gameStarted, setGameStarted] = useState(false);
  const [gameData, setGameData] = useState({});
  const [gameMode, setGameMode] = useState(null);
  // const [multiplayerSessionOver, setMultiplayerSessionOver] = useState(false);
  const [players, setPlayers] = useState([]);


  const handlePlay = () => {
    setGameStarted(true);
    setGameData(null);
    // setMultiplayerSessionOver(false);
    setGameMode("quick");
  };

  const handleSnippetCompletion = (data) => {
    setGameStarted(false);
    setGameData(data);

    // if (gameMode === "multi") {
    //   setMultiplayerSessionOver(data.gameOver);
    // }
  };

  useEffect(() => {
    if (gameSessionId) {
      setGameStarted(true);

      fetch(`/game_sessions/${gameSessionId}.json`, {
        headers: {
          "Accept": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.players && data.players.length > 1) {
            setGameMode("multi");
          } else {
            setGameMode("single");
          }
        })
        .catch(error => {
          console.error("Error fetching game sessions details (gameMode):", error);
        });
    }

  }, [gameSessionId]);

  // const shouldShowGameOver = () => {
  //   console.log("Checking game over with:", {
  //     gameMode,
  //     gameData,
  //     playerGameOver: gameData && gameData.player_game_over,
  //     gameStarted
  //   });

  //   if (gameMode === "multi") {
  //     const shouldShow = gameData && gameData.player_game_over;
  //     console.log("Multi result:", shouldShow);
  //     return shouldShow;
  //   } else {
  //     const shouldShow = !gameStarted && gameData;
  //     console.log("Single result:", shouldShow);
  //     return shouldShow;
  //   }
  // };
  const shouldShowGameOver = () => {
    // Only show GameOver if we have actual data
    if (gameMode === "multi") {
      return gameData && Object.keys(gameData).length > 0 && gameData.playerGameOver;
    } else {
      return !gameStarted && Object.keys(gameData).length > 0;
    }
  };

  console.log("🤡🤡🤡🤡");
  console.log(gameSessionId);
  console.log(gameData);


  return (
    <div>
      {!gameStarted && Object.keys(gameData).length === 0 && !gameSessionId && (
        <>
          <HeroSection onPlay={handlePlay} />
          <div className="d-flex justify-content-center">
            <div className="container mt-5 d-flex flex-column align-items-center">
              <div className="mt-4">
                <ul className="list-unstyled">
                  <li>Press Play</li>
                  <li>Select a snippet</li>
                  <li>Slip it into regular conversation without anyone noticing</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      {gameStarted && (
        <SnippetsGame
          game_session_id={gameSessionId}
          gameMode={gameMode}
          gameData={gameData}
          setGameData={setGameData}
          onSnippetComplete={handleSnippetCompletion}
          players={players}
          setPlayers={setPlayers}
        />
      )}

      {shouldShowGameOver() && Object.keys(gameData).length > 0 && (
        <GameOver
          gameData={gameData}
          setGameData={setGameData}
          players={players}
          setPlayers={setPlayers}
          />
      )}
    </div>
  );
}

export default MainComponent;
