class LyricSnippet < ApplicationRecord
  has_many :rounds, dependent: :destroy
  has_one_attached :image

  validates :snippet, presence: true
  validates :artist, presence: true
  validates :song, presence: true
  validates :difficulty, presence: true, inclusion: { in: 0..1000 }
  validates :language, inclusion: { in: %w[English German] }

  def self.languages
    validators_on(:language).first.options[:in]
  end

  before_save :attach_album_cover

  private

  def attach_album_cover
    artist_name = artist
    song_name = song

    image_url = find_best_album_match(spotify_api_call(artist_name, song_name), artist_name)
    return unless image_url

    p "IMAGE_URL:"
    p image_url
    p "😎😋😊😎😋 END"

    downloaded_image = URI.open(image_url)
    image.attach(
      io: downloaded_image,
      filename: "#{artist_name}_#{song_name}.jpg"
    )
  end

  def normalize_artist_name(name)
    name.downcase.gsub(/[^a-z0-9\s]/i, "").strip
  end

  def find_best_album_match(response, artist_name)
    albums = response.dig("albums", "items")
    return nil unless albums&.any?

    best_match = albums.find do |album|
      album["album_type"] == "album" &&
      album["artists"].any? do |artist|
        normalize_artist_name(artist["name"]) == normalize_artist_name(artist_name)
      end
    end

    best_match&.dig("images", 0, "url")
  end

  def spotify_api_call(artist_name, song_name)
    token = SpotifyService.get_access_token
    url = "https://api.spotify.com/v1/search?q=20track%3A#{song_name.downcase}%2520artist%3A#{artist_name.downcase}&type=album"

    response = HTTParty.get(
      url,
      headers: {
        "Authorization" => "Bearer #{token}"
      }
    )
    p "😪"
    p "🥰🥰🥰🥰🥰🥰🥰🥰🥰🥰🥰🥰🥰🥰🥰🥰🥰 START #{artist_name} -- #{song_name}"
    p "Full URL with query: #{response.request.last_uri}"
    p "Base URI: #{response.request.uri}"
    p "Path: #{response.request.path}"
    p "Query string: #{response.request.uri.query}"
    p "HTT🥳 encoded params: #{URI.decode_www_form(response.request.uri.query).to_h}"
    # p response
    # response["albums"]["items"][0]["images"][0]["url"]
    response
  end
end
