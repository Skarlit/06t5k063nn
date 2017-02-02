require 'test_helper'

class Api::SeiyuuControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_seiyuu_index_url
    assert_response :success
  end

  test "should get create" do
    get api_seiyuu_create_url
    assert_response :success
  end

  test "should get new" do
    get api_seiyuu_new_url
    assert_response :success
  end

  test "should get destroy" do
    get api_seiyuu_destroy_url
    assert_response :success
  end

  test "should get show" do
    get api_seiyuu_show_url
    assert_response :success
  end

end
