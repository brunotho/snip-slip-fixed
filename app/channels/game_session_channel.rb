class GameSessionChannel < ApplicationCable::Channel
  def subscribed
    p "game_session_channel.rb 🟢 session_id: #{params[:game_session_id]}"
    @game_session = GameSession.find(params[:game_session_id])
    stream_for @game_session
    broadcast_player_joined
  end

  def unsubscribed
    p "game_session_channel.rb 🔴 session_id: #{params[:game_session_id]}"
    broadcast_player_left
  end

  private

  def broadcast_player_joined
    ActionCable.server.broadcast(
      "game_session_#{@game_session_id}",
      {
        type: "player_joined",
        player: {
          id: current_user.id,
          name: current_user.name,
          rounds_played: 0,
          successful_rounds_count: 0,
          total_score: 0
        }
      }
    )
  end

  def broadcast_player_left
    ActionCable.server.broadcast "game_session_#{@game_session_id}", {
      type: "player_left",
      player_id: current_user.id
    }
  end
end
