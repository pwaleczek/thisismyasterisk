require 'bundler/capistrano'
require 'yaml'
set :default_environment, {
	'PATH' => "/home/pawel/.rvm/gems/ruby-2.0.0-p195/bin:/home/pawel/.rvm/gems/ruby-2.0.0-p195@global/bin:/home/pawel/.rvm/rubies/ruby-2.0.0-p195/bin:/home/pawel/.rvm/bin:/home/pawel/.nvm/v0.10.10/bin:/home/pawel/bin:/usr/local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/home/pawel/.rvm/bin:$PATH",
	'GEM_HOME' => "/home/pawel/.rvm/gems/ruby-2.0.0-p195",
	'GEM_PATH' => "/home/pawel/.rvm/gems/ruby-2.0.0-p195:/home/pawel/.rvm/gems/ruby-2.0.0-p195@global",
	#'GEM_CACHE' => "$GEM_HOME/cache"
}
set :ssh_options, {:forward_agent => true} 
set :bundle_dir,          ""
set :bundle_flags,        ""
set :bundle_cmd, 'source $HOME/.bash_profile && bundle'
set :use_sudo, false

set :user, 'pawel'
set :domain, 'thisismyasterisk.org'
set :applicationdir, "/home/pawel/ruby_apps/thisismyasterisk"
 
set :scm, 'git'
set :repository, "~/repos/thisismyasterisk.git"
set :local_repository, "ssh://pawel@thisismyasterisk.org/~/repos/thisismyasterisk.git"
set :git_enable_submodules, 1 # if you have vendored rails
set :branch, 'master'
set :git_shallow_clone, 1
set :scm_verbose, true
 
# roles (servers)
role :web, domain
role :app, domain
role :db,  domain, :primary => true
 
# deploy config
set :deploy_to, applicationdir
set :deploy_via, :export
 
# additional settings
default_run_options[:pty] = true  # Forgo errors when deploying from windows
         # If you are using ssh_keysset :chmod755, "app config db lib public vendor script script/* public/disp*"set :use_sudo, false
namespace :deploy do 
	task :precompile do
		run "cd #{releases_path}/#{release_name} && source $HOME/.bash_profile && rake assets:precompile"
	end
	task :clean_assets do
		run "rm -rf ~/ruby_apps/thisismyasterisk/shared/assets/*"
	end
	task :make_db do
		run "rm -rf #{releases_path}/#{release_name}/db/production.sqlite3 && ln -s /home/pawel/ruby_apps/thisismyasterisk/db/database.sqlite3 #{releases_path}/#{release_name}/db/production.sqlite3"
	end
end

before "deploy:update", "deploy:clean_assets"

before "deploy:restart", "deploy:make_db"
#before "deploy:restart", "deploy:precompile"

#Passenger
# namespace :deploy do
#   task :start do ; end
#   task :stop do ; end
#   task :restart, :roles => :app, :except => { :no_release => true } do
#     run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
#   end
# end
