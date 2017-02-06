json.login do
  json.partial! 'json/partials/login'
end
json.language do
  json.current do
    json.partial! strings_partial
  end
  json.set! :cached, {}
end
json.endpoints do
  json.partial! 'json/partials/endpoints'
end
