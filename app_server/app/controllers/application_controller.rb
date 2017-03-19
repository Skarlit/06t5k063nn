class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :set_locale

  SUPPORTED_LOCALE = [:en, :ja]

  STRINGS_PATH_BY_LOCALE = {
    ja: "/json/partials/strings/ja_strings",
    en: "/json/partials/strings/en_strings"
  }

  def set_locale
    I18n.locale = I18n.default_locale
    user_pref = cookies[:locale].to_sym
    if SUPPORTED_LOCALE.include? user_pref
      I18n.locale = user_pref
    end
  end

  def get_strings_path
    return STRINGS_PATH_BY_LOCALE[I18n.locale]
  end
end
