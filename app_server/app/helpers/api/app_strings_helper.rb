module Api::AppStringsHelper
  LOCALE_PATHS = {"jp" => "jp_strings", "en" => "en_strings"}
  PARTIAL_ROOT = "/json/partials/strings"
  def get_strings_partial_location(locale)
    if locale && LOCALE_PATHS[locale]
      return "#{PARTIAL_ROOT}/#{LOCALE_PATHS[locale]}"
    else
      return "#{PARTIAL_ROOT}/#{LOCALE_PATHS["en"]}"
    end
  end
end
