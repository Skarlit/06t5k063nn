class Character
  include Mongoid::Document

  has_and_belongs_to_many :medium, inverse_of: :character
  has_and_belongs_to_many :seiyuu, inverse_of: :seiyuu

end
