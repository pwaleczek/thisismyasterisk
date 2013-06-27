class LabController < ApplicationController

	def index
		@labs = Lab.all

		respond_to do |format|
			format.json {render :json => @labs}
		end


	end

end
