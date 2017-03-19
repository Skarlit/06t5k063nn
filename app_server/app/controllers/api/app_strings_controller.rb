class Api::AppStringsController < ApplicationController

  def index
    render locals: {path_to_partial: get_strings_path}
  end
end
