class Identity < ApplicationRecord
  belongs_to :user, dependent: :destroy
  validates_presence_of :uid, :provider
  validates_uniqueness_of :uid, :scope => :provider

end
