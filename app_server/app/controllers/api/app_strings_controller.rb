class Api::AppStringsController < ApplicationController
  include Api::AppStringsHelper

  def index
    locale = params[:locale] || cookies[:locale]

    render locals: {path_to_partial: get_strings_partial_location(locale)}
  end
end
