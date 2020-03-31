json.array! @messages do |message|
  json.user_name messsage.user.name
  json.user_id message.user.id
  json.content message.content
  json.image message.image_url
  json.created_at message .created_at.strftime("%Y年%m月%d日 %H時%M分")
end