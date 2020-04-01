json.array! @messages do |message|
  json.user_name message.user.name
  json.id message.id
  json.content message.content
  json.image message.image_url
  json.created_at message.created_at.to_s
end