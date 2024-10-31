class CreateLyricSnippets < ActiveRecord::Migration[7.2]
  def change
    create_table :lyric_snippets do |t|
      t.string :snippet
      t.string :artist
      t.string :song
      t.integer :difficulty

      t.timestamps
    end
  end
end
