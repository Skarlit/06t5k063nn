class Api::CharacterController < ApplicationController
  def index
  end

  def create
    begin
      unless params[:name] && params[:name_hira]
        throw MissingAttribute
      end
        
      avatar = nil
      if params[:avatar]
        # avatar = Paperclip.io_adapters.for(params[:avatar])
        # avatar.original_filename = "#{SecureRandom.hex(5)}.png"
      end
      c = Character.new({
        name: params[:name],
        name_hira: params[:name_hira],
        avatar: avatar
      })
      if c.save
        render json: c, :status => 200
      else 
        throw MissingAttribute
      end
    rescue
      render json: {error: "Bad request"}, :status => 400
    end
  end

  def destroy
  end

  def show
    render json: Character.where(id: params[:id]).first
  end

  class MissingAttribute < ActionController::BadRequest 
  end
end
