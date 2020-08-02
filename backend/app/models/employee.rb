class Employee < ApplicationRecord
     validates_presence_of :name, :email
     validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
end
