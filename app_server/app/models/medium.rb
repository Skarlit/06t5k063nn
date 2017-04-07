class Medium
  include Mongoid::Document
  field :medium_type, type: String # VN, Eroge, Game, Manga, Anime, EroAnime, Novel, LightNovel, Other
  field :name, type: String, localize: true
  embeds_many :links
  has_many :characters, inverse_of: :medium
end
