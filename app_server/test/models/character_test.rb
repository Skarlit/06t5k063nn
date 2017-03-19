require 'test_helper'

class CharacterTest < ActiveSupport::TestCase
  test "Character creation" do
    c = Character.new(name: "Yukina Himeragi")
  end
end
