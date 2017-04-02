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

    render json: es_result
  end
end
