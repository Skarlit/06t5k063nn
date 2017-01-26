class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable, :confirmable

  has_many :identities

   def self.from_omniauth(auth)
     user_id = Identity.find_by(provider: auth.provider, uid: auth.uid)
     if !user_id
       User.transaction do
         user = User.new
         user.identities << Identity.new(provider: auth.provider, uid: auth.uid)
         user.email = auth.info.email
         user.password = Devise.friendly_token[0,20]
         user.name = auth.info.name   # assuming the user model has a name
         user.image = auth.info.image
        #  user.image = auth.info.image # assuming the user model has an image
         user.skip_confirmation!
         user.save!
         return user
       end
     else
       if !user_id.user.image
         user_id.user.image = auth.info.image
         user_id.user.save!
       end
       return user_id.user
     end
   end
end
