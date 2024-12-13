class CreateUserPlayedSnippets < ActiveRecord::Migration[7.2]
  def change
    create_table :user_played_snippets do |t|
      t.references :user, null: false, foreign_key: true
      t.references :lyric_snippet, null: false, foreign_key: true

      t.timestamps
    end
  end
end
