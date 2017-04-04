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
  has_attached_file :avatar, :storage => :s3,
                    styles: { medium: "150x150#", thumb: "50x50#" },
                    # path: "/image/:class/:basename-:id-:style.:extension",
                    # url: ":s3_domain_url",
                    # s3_protocol: "https",
                    # default_url: "/images/missing_:class.png",
                    size: { in: 0..500.kilobytes },
                    s3_credentials: Rails.application.config.s3_credentials
  
  do_not_validate_attachment_file_type :avatar
  
  field :name, localize: true, type: String
  field :name_hira, localize: true, type: String

  # settings index: { number_of_shards: 1 } do
  #   mappings dynamic: 'false' do
  #     indexes :name_hira, analyzer: 'english', index_options: 'offsets'
  #   end
  # end

  def as_indexed_json(options = {})
    as_json(except: [:id, :_id])  # Do not pass id to elasticsearch
  end
end
