Rails.application.routes.draw do
    get 'audio/info_list' => "audio#info_list"
    get 'audio/info_share' => "audio#info_share"
    post 'audio/share' => "audio#share"
    get 'audio/list' => "audio#list"
    #get 'audio/highlight' => "audio#highlight"
     
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
