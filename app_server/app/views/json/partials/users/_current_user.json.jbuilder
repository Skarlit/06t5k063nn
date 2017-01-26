if current_user
  json.loggedIn true
  json.name current_user.name
  json.image current_user.image
  # json.origin current_user.origin
else
  json.loggedIn false
  json.name nil
  json.image nil
end
