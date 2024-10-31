class AddLanguageToLyricSnippet < ActiveRecord::Migration[7.2]
  def change
    add_column :lyric_snippets, :language, :string
  end
end
