json.array! @messages do |message|
  json.content message.content
  json.image message.image
  json.date Time.now.strftime("%Y/%m/%d %H:%M")
  json.user_name message.user.name
  json.id message.id
end