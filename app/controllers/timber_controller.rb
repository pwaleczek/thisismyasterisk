class TimberController < ApplicationController

	def show

		@post = Post.find_by_id(params[:id])

		respond_to do |format|
			format.html
			format.json {render :json => @post}
		end

	end

end
