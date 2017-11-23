class CreateShares < ActiveRecord::Migration[5.1]
  def change
    create_table :shares do |t|
      t.integer :main_id
      t.float   :start_time
      t.float   :end_time
      t.string  :content

      t.timestamps
    end
  end
end
