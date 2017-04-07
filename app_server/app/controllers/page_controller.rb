class PageController < ApplicationController
  include Api::AppStringsHelper

  before_action :common_init

  def home
    render 'kyaralist'
  end

  def media
    render 'kyaralist'
  end

  def voice
    render 'kyaralist'
  end

  def character
    render 'kyaralist'
  end

  def artist
    render 'kyaralist'
  end

  def test
    render 'test'
  end

  private
  def common_init
    if current_user
      @current_user = current_user
    end
    @strings_partial = get_strings_path
    @browser = Browser.new(request.user_agent, accept_language: 'us-en')
    @is_mobile = @browser.device.mobile?
  end
end
