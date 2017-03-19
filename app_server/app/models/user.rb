class User #< ApplicationRecord
  include Mongoid::Document
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  field :reset_password_token, type: String, default: ""

  ## Trackable
  field :sign_in_count,      :type => Integer
  field :current_sign_in_at, :type => Time
  field :last_sign_in_at,    :type => Time
  field :current_sign_in_ip, :type => String
  field :last_sign_in_ip,    :type => String

  ## Recoverable
  field :reset_password_token,   :type => String
  field :reset_password_sent_at, :type => Time

  ## Rememberable
  field :remember_created_at, :type => Time

  ## Database authenticatable
  field :email, type: String
  field :encrypted_password, type: String, default: ""

  ## Misc
  field :image, type: String
  field :name, type: String

  has_many :auth_strategies, :autosave => true, inverse_of: :user

  index({email: 1}, {unique: true, background: true})

  def self.from_omniauth(user_data, raw_result)
  #  user_id = Identity.find_by(provider: auth.provider, uid: auth.uid)
    
  # try finding user by auth uid
    auth_strategy = AuthStrategy.find_by(uid: user_data[:uid], provider: user_data[:provider])
    if auth_strategy and auth_strategy.user
      user = auth_strategy.user
      if !user[:image]
        user.update()
        user.image = user_data[:image]
        user.save!
      end
      return user
    else
      # try finding by email
      user = User.find_by(email: user_data[:email])
      new_auth_strat = AuthStrategy.new
      new_auth_strat.provider = user_data[:provider]
      new_auth_strat.uid = user_data[:uid]
      if user
        user.auth_strategies << new_auth_strat
        user.save!
        return user
      else
        user = User.new
        user.email = user_data[:email]
        user.auth_strategies << new_auth_strat
        user.password = Devise.friendly_token[0,20]
        user.name = user_data[:name]   # assuming the user model has a name
        user.image = user_data[:image]
        user.save!
        user
      end
    end
  end
end
