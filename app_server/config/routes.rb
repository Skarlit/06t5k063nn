Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  class XHRConstraint
    def matches?(request)
      !request.xhr? && !(request.url =~ /\.json$/ && ::Rails.env == 'development')
    end
  end

  namespace :api, :defaults => { :format => 'json' } do
    get 'strings' => 'app_strings#index'
  end

  # get '/', to: 'page#home'

  get '(*url)' => 'page#home', :constraints => XHRConstraint.new
end
