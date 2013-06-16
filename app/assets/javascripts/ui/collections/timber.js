define([
	'utils',
	'backbone',
	'underscore',
	'localstorage'
], function(Utils, Backbone, _) {
	
	console.log('Loading timber collection module for UI...');
	
	var TimberModel = Backbone.Model.extend({});
	
	var TimberCollection = Backbone.Collection.extend({
		initialize: function() {
			console.log('Timber collection init.');
		},

		model: TimberModel,
		
		url: '/timber'
	});
	console.log('										...loaded.');
	return TimberCollection;
});