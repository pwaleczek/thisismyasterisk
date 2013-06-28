class Lab < ActiveRecord::Base
  attr_accessible :description, :name, :tags, :labId, :image, :view, :releasePool
end
