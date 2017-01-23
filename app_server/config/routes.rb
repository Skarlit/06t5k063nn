Rails.application.routes.draw do
  root to: 'page#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  class XHRConstraint
    def matches?(request)
      !request.xhr? && !(request.url =~ /\.json$/ && ::Rails.env == 'development')
    end
  end

  namespace :api, :defaults => { :format => 'json' } do
    get 'strings/:locale' => 'app_strings#index', as: :get_strings_api
  end

  devise_for :users, :controllers => { omniauth_callbacks: 'users/omniauth_callbacks' }
  devise_scope :user do
    delete 'sign_out', to: 'devise/sessions#destroy', as: :user_logout_api
  end

  unless Rails.env.production?
    get "/test" => 'page#test'
  end
  # get '/', to: 'page#home'

  get '(*url)' => 'page#home', :constraints => XHRConstraint.new
end
