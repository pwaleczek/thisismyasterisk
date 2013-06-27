class TimberController < ApplicationController

	def index 
		per_page = 5
		@posts = Post.limit(per_page).offset(params[:offset])

		respond_to do |format|
			format.json {render :json => @posts}
		end

	end
	
	def show

		@post = Post.find_by_id(params[:id])

		respond_to do |format|
			format.html
			format.json {render :json => @post}
		end

	end

end
