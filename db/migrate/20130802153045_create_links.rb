class CreateLinks < ActiveRecord::Migration
  def change
    create_table :links do |t|
      t.integer :id
      t.string :title
      t.string :link

      t.timestamps
    end
  end
end
