class Character
  include Mongoid::Document
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks

  # index name for keeping consistency among existing environments
  index_name "character-#{Rails.env}"

  # has_and_belongs_to_many :medium, inverse_of: :character
  # has_and_belongs_to_many :seiyuu, inverse_of: :seiyuu

  field :name, localize: true
  field :name_hira, localize: true

  # settings index: { number_of_shards: 1 } do
  #   mappings dynamic: 'false' do
  #     indexes :name_hira, analyzer: 'english', index_options: 'offsets'
  #   end
  # end

  def as_indexed_json(options = {})
    as_json(except: [:id, :_id])
  end
end
