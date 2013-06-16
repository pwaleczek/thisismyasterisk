define([
	'utils',
	'backbone',
	'underscore',
	'localstorage'
], function(Utils, Backbone, _) {
	
	console.log('Loading game collection module for UI...');
	
	var GameModel = Backbone.Model.extend({});
	
	var GameCollection = Backbone.Collection.extend({
		localStorage: new Backbone.LocalStorage('gameData'),

		initialize: function() {
			console.log('Game collection init.');
		},
		model: GameModel
	});
	console.log('										...loaded.');
	return GameCollection;
});