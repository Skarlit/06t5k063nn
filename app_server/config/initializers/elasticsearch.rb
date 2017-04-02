require 'elasticsearch/model'


Rails.application.config.elasticsearch = {
  index: "yflist-#{Rails.env}"
}


# config = {
#   hosts: ENV['ELASTICSEARCH_URL'] || "http://localhost:9200/"
# }

if File.exists?("config/elasticsearch.yml") && YAML.load_file("config/elasticsearch.yml")
  config.merge!(YAML.load_file("config/elasticsearch.yml").symbolize_keys)
end


Elasticsearch::Model.client = Elasticsearch::Client.new

unless Character.__elasticsearch__.index_exists?
  Character.__elasticsearch__.create_index! force: true
  Character.import force: true
end