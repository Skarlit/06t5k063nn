class Link
  include Mongoid::Document
  field :name, type: String
  field :href, type: String
  field :icon, type: String
end
