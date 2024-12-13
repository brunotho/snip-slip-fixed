class UserPlayedSnippetsController < ApplicationController
  def record_play
    # something something background job
  end

  private

  def play_params
    params.require(:user_played_snippet).permit(:lyric_snippet_id)
  end
end
