require_relative 'boot'

# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
# require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"
require "rails/test_unit/railtie"

# require 'rails/all'
# require 'neo4j/railtie'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module AppServer
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # config.generators do |g|
    #   g.orm :active_record
    # end


    # config.generators do |g|
    #   g.orm             :neo4j
    # end
    # Configure where the embedded neo4j database should exist
    # Notice embedded db is only available for JRuby
    # config.neo4j.session_type = :embedded  # default :http
    # config.neo4j.session_path = File.expand_path('neo4j-db', Rails.root)
    # config.neo4j.session_type = :http
    # config.neo4j.session_path = 'http://neo4j:1234@localhost:7474'
    config.generators do |g|
      g.orm :mongoid
    end
  end
end
