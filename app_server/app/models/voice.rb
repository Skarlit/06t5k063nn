class Voice
  include Mongoid::Document
  field :name, type: String, localize: true
  field :name_hira, type: String, localize: true

  has_many :characters
end
