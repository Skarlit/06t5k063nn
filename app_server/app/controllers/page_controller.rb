class PageController < ApplicationController
  include Api::AppStringsHelper

  def home
    @strings_partial = get_strings_partial_location(cookies[:locale])
    @browser = Browser.new(request.user_agent, accept_language: 'us-en')
    @is_mobile = @browser.device.mobile?
    render 'kyaralist'
  end

  def test
    render 'test'
  end
end
