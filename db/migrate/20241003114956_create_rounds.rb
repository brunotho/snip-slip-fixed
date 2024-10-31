class CreateRounds < ActiveRecord::Migration[7.2]
  def change
    create_table :rounds do |t|
      t.references :lyric_snippet, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.references :game_session, null: false, foreign_key: true
      t.boolean :success

      t.timestamps
    end
  end
end
