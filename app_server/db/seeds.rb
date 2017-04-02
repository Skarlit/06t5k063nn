# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
I18n.locale = :en
a = Character.new({name: "Yukina Himeragi", name_hira: "Yukina Himeragi"})
a.save
I18n.locale = :ja
a.name = "姫柊雪菜"
a.name_hira = "ひめらぎゆきな"
a.update
