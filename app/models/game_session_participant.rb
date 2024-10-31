class GameSessionParticipant < ApplicationRecord
  belongs_to :game_session
  belongs_to :user

  validates :user_id, uniqueness: { scope: :game_session_id, message: "user already in this session" }
end
