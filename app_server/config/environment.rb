# Load the Rails application.
require_relative 'application'

application_settings = YAML.load_file("/config/yflist_conf.yml").fetch(Rails.env)
application_settings.each do |k, v|
  ENV[k.to_s] = v
end

# Initialize the Rails application.
Rails.application.initialize!
