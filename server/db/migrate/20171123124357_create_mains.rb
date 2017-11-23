class CreateMains < ActiveRecord::Migration[5.1]
  def change
    create_table :mains do |t|
      
      t.string    :title
      t.string    :info
      t.string    :audio_url
      t.integer   :count
                  
      t.timestamps
    end
  end
end
