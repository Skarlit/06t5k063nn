class Api::SearchController < ApplicationController
  SEARCH_RESULT_LIMIT = 25
  AUTO_COMPLETE_LIMIT = 5

  def cv
  
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
    render file: "json/partials/character/_list.json.jbuilder", locals: {characters: characters}
  end
end
