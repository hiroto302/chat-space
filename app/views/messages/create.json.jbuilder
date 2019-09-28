json.(@message, :content, :image)
json.date Time.now.strftime("%Y/%m/%d %H:%M")
json.user_name @message.user.name
json.id @message.id