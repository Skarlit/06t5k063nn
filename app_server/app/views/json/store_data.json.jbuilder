json.login do
  json.partial! 'json/partials/login'
end
json.strings do
  json.partial! strings_partial
end
json.endpoints do
  json.partial! 'json/partials/endpoints'
end
