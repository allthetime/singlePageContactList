
get '/' do
  content_type :json
  contacts_json = Contact.all.order(:last_name).to_json
end

get '/:id' do
  content_type :json
  contact_json = Contact.find(params[:id]).to_json
end

get '/find/:query' do 
  content_type :json  
  # results = Contact.query_all(params[:query]).to_json
  results = Contact.query_all(params[:query]).pluck(:id).to_json
end

post '/' do 
  contact = Contact.new(
    first_name: params[:first_name],
    last_name: params[:last_name],
    email: params[:email],
    phone_number: params[:phone_number],
    github: params[:github]
  )
  if contact.save
    content_type :json
    contact.to_json
  else
    ":("
  end
end

post '/destroy/:id' do 
  contact = Contact.find(params[:id])
  contact.destroy
end

post '/edit/:id' do 
  contact = Contact.find(params[:id])
  contact.update( params[:column] => params[:value])
end


