class Api::SearchController < ApplicationController
  def va
  
  end

  def all

  end

  def medium

  end

  def char
    render Character.search(params[:q])
  end
end
