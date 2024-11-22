import React, { useEffect } from 'react';
import GameProgressCard from './GameProgressCard';
import GameLayout from './GameLayout';
import { createGameSessionChannel } from '../channels/game_session_channel';

function GameOver({ gameData, setGameData }) {
  if (!gameData) return null;

  console.log("GAMEOVER gameData:", { gameData });

  useEffect(() => {
    console.log("Setting up GameOver channel with session:", gameData.game_session_id);
    const gameChannel = createGameSessionChannel(gameData.game_session_id);

    gameChannel.received = (data) => {
      console.log("GameOver received update:", data);

      if (data.type === "round_completed") {
        setGameData(prevGameData => ({
          ...prevGameData,
          players: {
            ...prevGameData.players,
            [data.player.id]: data.player
          },
          gameOver: data.game_over,
        }));
      }
    };

    return () => {
      console.log("Cleaning up GameOver channel");
      gameChannel.unsubscribe();
    };
  }, [gameData.game_session_id]);

  const gameMode = Object.values(gameData.players).length > 1 ? 'multi' : 'single'

  const winnerIds = Object.values(gameData.players).reduce((highest, player) => {
    console.log("Winner ids calucalted with:");
    console.log(gameData.players);

    if (player.total_score > highest.score) {
      return { score: player.total_score, ids: [player.id] };
    } else if (player.total_score === highest.score) {
      return { ...highest, ids: [...highest.ids, player.id] };
    }
    return highest;
  }, { score: -1, ids: [] }).ids;

  // console.log("GameOver rendering with:", {
  //   players: Object.values(gameData.players).map(p => `${p.name}: ${p.total_score}`),
  //   winnerIds
  // });

  return (
    <GameLayout
    mainContent={
      <div className="container mt-3">
        <div className="row justify-content-center">
            <h2 className="mb-4 text-center">Game Over!</h2>
            <div>
              {/* <div className="col-md-12"> */}
              <GameProgressCard
                playerName={Object.keys(gameData.players).length > 1 ? gameData.currentPlayerName : ""}
                totalScore={gameMode === 'multi' ? gameData.players[gameData.currentPlayerId].total_score : gameData.totalScore}
                roundsPlayed={gameMode === 'multi' ? gameData.players[gameData.currentPlayerId].rounds_played : gameData.roundsPlayed}
                roundHistory={gameMode === 'multi' ? gameData.players[gameData.currentPlayerId].round_history : gameData.roundHistory}
                winner={gameData.gameOver && winnerIds.includes(gameData.currentPlayerId) && Object.keys(gameData.players).length > 1}
              />
              {/* </div> */}
            </div>
        </div>
      </div>
    }
    sideContent={
      <div className="multiplayer-progress">
        <div>
          {Object.values(gameData.players)
            .filter(player => player.id !== gameData.currentPlayerId)
            .map(player => (
              <div key={player.id} className="mb-3">
                <GameProgressCard
                  playerName={player.name}
                  totalScore={player.total_score}
                  roundsPlayed={player.rounds_played}
                  roundHistory={player.round_history}
                  winner={gameData.gameOver && winnerIds.includes(player.id)}
                />
              </div>
            ))}
        </div>
      </div>
    }
    showSidePanel={true}
    gameOver={true}
  />
  );
}

export default GameOver;
