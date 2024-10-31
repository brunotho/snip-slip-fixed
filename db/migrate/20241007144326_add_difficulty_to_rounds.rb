class AddDifficultyToRounds < ActiveRecord::Migration[7.2]
  def change
    add_column :rounds, :difficulty, :integer
  end
end
