class Artist
  include Mongoid::Document
  field :name, type: String
  field :link, type: String
  
  has_many :characters
end
