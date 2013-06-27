class XHRConstraint
  def matches?(request)
    !request.xhr? && !(request.url =~ /\.json$/ && ::Rails.env == 'development')
  end
end

Thisismyasterisk::Application.routes.draw do
  root :to => 'main#index'
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  match '(*url)' => 'main#index', :constraints => XHRConstraint.new


  resources :timber, :only => [:show, :index]
  resources :labs, :only => [:show, :index]
  # resources :works, :only => [:show, :index]

  # match "/rss" => "main#rss", :as => :rss_feed

end

