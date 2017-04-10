class Character
  include Mongoid::Document
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks
  mount_base64_uploader :avatar, AvatarUploader #, file_name: -> (u) { u.id }

  # attr_accessor :avatar_file_name

  # index name for keeping consistency among existing environments
  index_name Rails.application.config.elasticsearch[:index]
  document_type "character"

  has_many :media, inverse_of: :character
  has_many :voices, inverse_of: :character
  
  field :name, localize: true, type: String
  field :name_hira, localize: true, type: String

  def as_indexed_json(options = {})
    as_json(except: [:id, :_id])  # Do not pass id to elasticsearch
  end
end
