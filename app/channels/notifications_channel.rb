class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    p "notifications_channel.rb 🟢"
    stream_from "user_notifications"
  end
end
