module ApplicationHelper
  MANIFEST = Rails.application.config.assets.manifest_json
  PREFIX = "#{Rails.application.config.asset_host}/#{Rails.application.config.assets.prefix}"
  def resolve_asset_path(filename)
    return "#{PREFIX}/#{MANIFEST.nil? ? filename : MANIFEST[filename]}"
  end
end
