class Contact < ActiveRecord::Base

  scope :query_all, -> (name) { where("UPPER(first_name) LIKE UPPER(?) OR UPPER(last_name) LIKE UPPER(?) OR UPPER(email) LIKE UPPER(?) ", "%#{name}%", "%#{name}%", "%#{name}%") if name }


  validates :first_name, :last_name, :presence => true
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, 
    :presence => {:message => "Enter your email address!" },
    :format => { :with => VALID_EMAIL_REGEX, :message => "Enter a valid email address !"},
    :uniqueness => {:case_sensitive => false, :message => "email already exists!"}

  def full_name
    "#{self.first_name} #{self.last_name}"
  end

end