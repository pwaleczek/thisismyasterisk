class MainController < ApplicationController

	def index 


		case params[:url]
		when "about"
			render "about"
		when "timber"
			@posts = Post.all
			render "timber/index"
		else


			respond_to do |format|
				format.html
				format.json
			end
		end



	end

end
