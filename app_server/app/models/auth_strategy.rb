class AuthStrategy
  include Mongoid::Document
  belongs_to :user, inverse_of: :authstrategy

  field :provider, type: String
  field :uid, type: String
  index({ provider: 1 , uid: 1}, { unique: true, background: true})
end