class Medium
  include Mongoid::Document
  field :medium_type, type: String # VN, 18+VN, Game, Manga, Anime, 18+Anime, Other
  field :name_jp, type: String
  field :name_en, type: String
  embeds_many :links
  has_many :characters, inverse_of: :medium
end
