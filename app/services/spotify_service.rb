class SpotifyService
  class << self
    def refresh_token
      response = HTTParty.post('https://accounts.spotify.com/api/token',
        body: {
          grant_type: 'refresh_token',
          refresh_token: ENV['SPOTIFY_REFRESH_TOKEN']
        },
        headers: {
          'Authorization' => "Basic #{Base64.strict_encode64("#{ENV['SPOTIFY_CLIENT_ID']}:#{ENV['SPOTIFY_CLIENT_SECRET']}")}"
        }
      )

      if response.success?
        Rails.cache.write('spotify_access_token', response['access_token'], expires_in: 1.hour)
        response['access_token']
      else
        raise "Failed to refresh token: #{response.body}"
      end
    end

    def get_access_token
      cached_token = Rails.cache.read('spotify_access_token')
      return cached_token if cached_token.present?

      refresh_token
    end

    def make_api_request(endpoint)
      token = get_access_token
      response = HTTParty.get(
        "https://api.spotify.com/v1/#{endpoint}",
        headers: {
          'Authorization' => "Bearer #{token}"
        }
      )

      if response.code == 401
        token = refresh_token
        response = HTTParty.get(
          "https://api.spotify.com/v1/#{endpoint}",
          headers: {
            'Authorization' => "Bearer #{token}"
          }
        )
      end

      response
    rescue => e
      Rails.logger.error("Spotify API error: #{e.message}")
      raise e
    end
  end
end
