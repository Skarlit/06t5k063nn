class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    auth = request.env["omniauth.auth"]
    @user = User.from_omniauth({
      email: auth.info.email, 
      name: auth.info.name,
      image: auth.info.image,
      provider: auth.info.provider,
      uid: auth.info.uid
    }, auth)
    if @user.persisted?
      sign_in @user, :event => :authentication #this will throw if @user is not activated
    else
      session["devise.facebook_data"] = request.env["omniauth.auth"]
    end
    render 'api/users/current_user.json.jbuilder'
  end

  def failure
    redirect_to root_path
  end
end
