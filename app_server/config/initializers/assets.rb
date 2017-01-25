# Be sure to restart your server when you modify this file.
# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'
Rails.application.config.assets.manifest_json = nil
manifest_path = Rails.root.join("public/manifest.json")
begin
  if File.exist?(manifest_path)
    File.open(manifest_path, "r") do |f|
      Rails.application.config.assets.manifest_json = JSON.load(f)
    end
  end
end

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
# Rails.application.config.assets.precompile += %w( lib.js app.js )
