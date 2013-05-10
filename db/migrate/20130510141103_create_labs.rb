class CreateLabs < ActiveRecord::Migration
  def change
    create_table :labs do |t|
      t.string :name
      t.text :description
      t.text :tags

      t.timestamps
    end
  end
end
