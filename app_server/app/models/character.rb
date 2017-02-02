class Character
  include Neo4j::ActiveNode
  property :name, type: String
  property :hiragana, type: String
  property :romaji, type: String
  property :en_name, type: String
end
