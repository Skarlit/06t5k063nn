class Api::SearchController < ApplicationController
  SEARCH_RESULT_LIMIT = 25
  AUTO_COMPLETE_LIMIT = 5

  def va
  
  end

  def all

  end

  def medium

  end

  def char
    limit = params[:short] ? AUTO_COMPLETE_LIMIT : SEARCH_RESULT_LIMIT
    es_result = Character.search \
             query: {
               match: {
                 name: params[:q]
               }
             },
             size: limit

    ids = es_result.collect { |s| s["_id"] }
    characters = Character.where({:_id.in => ids})
    result = characters.map do |c|  
      {thumb: c.avatar.url, name: c.name, id: c._id.to_s}
    end
    # c = Character.where({id: es_result["_id"]}).first
    # es_result[:url] = c.avatar.url(:thumb)
    render json: result
  end
end
