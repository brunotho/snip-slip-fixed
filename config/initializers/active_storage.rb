Rails.application.config.to_prepare do
  ActiveStorage::Current.url_options = {
    host: ENV.fetch('HEROKU_APP_URL', 'snip-slip-21fb4924292b.herokuapp.com'),
    protocol: 'https'
  }
end
