# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
I18n.locale = :en
Character.create({name: "Yukina Himeragi", name_hira: "Yukina Himeragi"})
I18n.locale = :ja
Character.create({name: "姫柊雪菜", name_hira: "ひめらぎゆきな"})
