class CreateContact < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.column :first_name, :string
      t.column :last_name, :string
      t.column :email, :string
      t.column :phone_number, :string
      t.column :github, :string
    end
  end
end
