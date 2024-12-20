class SnippetsController < ApplicationController
  before_action :authenticate_user!, except: [ :index, :fetch_snippets ]

  def test
    @lyric_snippet = LyricSnippet.first
  end

  def index
    @game_session = current_game_session
  end

  def new
    @lyric_snippet = LyricSnippet.new
  end

  def create
    @lyric_snippet = LyricSnippet.new(snippet_params)

    if @lyric_snippet.save
      @snippet_data = @lyric_snippet.as_json.merge(
        image_url: @lyric_snippet.image.url
      )
      render :thank_you
    else
      render :new, status: 422
    end
  end

  def fetch_snippets
    user_language = current_user&.language || "English"
    random_ids = LyricSnippet
                .where.not(snippet: "Dummy snippet for failed rounds")
                .where(language: user_language)
                # .where(artist: "Arctic Monkeys")
                .pluck(:id)
                .sample(20)
    snippets = LyricSnippet
                .where(id: random_ids)
                .sample(4)

    render json: snippets.map { |snippet|
      snippet.as_json.merge({
        image_url: snippet.image.attached? ? snippet.image.url : nil
      })
    }
  end

  private

  def snippet_params
    params.require(:lyric_snippet).permit(:snippet, :artist, :song, :difficulty, :language)
  end
end
