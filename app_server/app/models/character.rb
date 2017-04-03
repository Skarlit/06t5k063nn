class Character
  include Mongoid::Document
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks
  include Paperclip::Glue

  attr_accessor :avatar_file_name

  # index name for keeping consistency among existing environments
  index_name Rails.application.config.elasticsearch[:index]
  document_type "character"

  has_many :media, inverse_of: :character
  has_many :voices, inverse_of: :character
  
  # Paperclip
  validates :avatar, attachment_presence: false
  validates_attachment_content_type :avatar, content_type: /\Aimage/

  has_attached_file :avatar, :storage => :s3,
                    styles: { medium: "300x300#", thumb: "50x50#" },
                    default_url: "/images/missing.png",
                    size: { in: 0..500.kilobytes },
                    s3_credentialsL: Rails.application.config.s3_credentials
  validates_attachment_content_type :avatar, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]
  
  field :name, localize: true
  field :name_hira, localize: true

  # settings index: { number_of_shards: 1 } do
  #   mappings dynamic: 'false' do
  #     indexes :name_hira, analyzer: 'english', index_options: 'offsets'
  #   end
  # end

  def as_indexed_json(options = {})
    as_json(except: [:id, :_id])  # Do not pass id to elasticsearch
  end
end
