class PageController < ApplicationController
  include Api::AppStringsHelper

  def home
    @strings_partial = get_strings_partial_location(cookies[:locale])
    render 'kyaralist'
  end

  def test
    render 'test'
  end
end
