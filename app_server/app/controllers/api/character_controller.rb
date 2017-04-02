class Api::CharacterController < ApplicationController
  def index
  end

  def create
    c = Character.new({
      name: params[:name],
      name_hira: params[:name_hira],
      avatar: params[:avatar] || nil
    })
    if c.save
      render json: c, :status => 200
    else
      render json: {error: "Bad request"}, :status => 400
    end
  end

  def destroy
  end

  def show
    render json: Character.where(id: params[:id]).first
  end
end
