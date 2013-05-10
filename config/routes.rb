Thisismyasterisk::Application.routes.draw do
  root :to => 'main#index'

  scope "admin", :as => "admin" do
    resources :timber
    resources :labs
    resources :works
  end

  resources :timber, :only => [:show, :index]
  resources :labs, :only => [:show, :index]
  resources :works, :only => [:show, :index]

  match "/rss" => "main#rss", :as => :rss_feed

end

