
get '/' do
  @title = 'Home'
  @items = get_items.count
  haml :index
end

get '/items' do
  json get_items
end

post '/item' do
  item_option = [params[:item], false]
  puts item_option[1].class
  add_item(item_option)
  json get_items
end

put '/item/:id' do
  index = params[:id].to_i
  item = get_items[index] 
  if item
    check_item(index, params[:checked])
  end
  json :ok
end

delete '/items' do
  session[:item_list] = []
  json :ok
end

def check_item(index, value)
  checked = value == 'true' ? true : false
  session[:item_list][index][1] = checked
end

def get_items
  session[:item_list] ||= []
end

def add_item(item)
  session[:item_list] << item
end
