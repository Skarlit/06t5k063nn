class Name
  include Mongoid::Document

  field :name_jp, type: String
  field :name_hiragana, type: String
  field :name_en, type: String
  
end
