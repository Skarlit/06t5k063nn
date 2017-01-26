json.fbSdk do
  json.status  true
  json.appId   Rails.application.config.facebook_app_id
  json.xfbml   false
  json.version Rails.application.config.facebook_sdk_ver
end

json.currentUser do
  json.partial! 'json/partials/users/current_user'
end
