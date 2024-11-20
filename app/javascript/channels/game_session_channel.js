import consumer from "./consumer"

export const createGameSessionChannel = (gameSessionId) => {
  console.log("Creating channel for game session:", gameSessionId);

  const channel = consumer.subscriptions.create(
    {
      channel: "GameSessionChannel",
      game_session_id: gameSessionId
    },
    {
      connected() {
        console.log("game_session_channel.js connected() 🟢:", gameSessionId);
      },

      disconnected() {
        console.log("game_session_channel.js disconnected() 🔴:", gameSessionId);
      },

      received(data) {
        console.log("GAMESESSIONCHANNEL received data 😍:", data);
        switch(data.type) {
          case "player_joined":
            console.log("Player joined:", data.player.name);
            break;
          case "player_left":
            console.log("Player left:", data.player.name);
            break;
          case "round_completed":
            console.log("Round completed:", data.player.name);
            break;
          default:
            console.log("Unknown message type:", data.type);
        }
          return data;
      },

      updateGameSessionState(gameSessionState) {
        this.perform('update_game_session_state', gameSessionState)
      }
    }
  );

  const originalReceived = channel.received;

  channel.received = (data) => {
    if (originalReceived) {
      originalReceived.call(channel, data);
    }
  };

  console.log("", channel)
  return channel;
};
