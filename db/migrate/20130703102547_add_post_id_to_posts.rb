class AddPostIdToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :postId, :string
  end
end
