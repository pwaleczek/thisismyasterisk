class AddReleasePoolToLab < ActiveRecord::Migration
  def change
    add_column :labs, :releasePool, :string
  end
end
