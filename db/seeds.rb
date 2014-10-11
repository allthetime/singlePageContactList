FactoryGirl.define do 
  factory :contact do
    sequence(:first_name) {Faker::Name.first_name}
    sequence(:last_name) {Faker::Name.last_name}
    sequence(:email) {Faker::Internet.email}
    sequence(:phone_number) {Faker::PhoneNumber.phone_number}
  end
end

1000.times{FactoryGirl.create(:contact)} 