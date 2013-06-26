/*
	@file: ui.js
	
	Copyright (c) 2013 Pawel Waleczek [pawel@thisismyasterisk.org], All rights reserved.

	THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF
	ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
	IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR
	PURPOSE.

	Please see the license.txt file for more information.
*/

define([
	'underscore',
	'ui/router',
	// models and collections
	'ui/collections/game',
	'ui/collections/timber',

	// controllers
	'ui/controllers/index',
	'ui/controllers/timber',
	'ui/controllers/bad',
	'ui/controllers/about',
	'ui/controllers/work',
	'ui/controllers/asterisk',
	'ui/controllers/lab'

], function (_, router, game, timber, index, timber, bad, about, work, asterisk, lab) {
	console.log('Loadeing UI...');
	window.UI = {
		
		speed: 200, // transitions base speed
		isRunning: false,

		Links: {
			GitHubIssues: 'http://github.com/pwaleczek/thisismyasterisk/issues'
		},

		Controllers: {},
		Collections: {},

		Router: null,
		
		initialize: function() {
			console.log('starting ui init.');
			
			//Backbone.history.start({pushState: true});
			
			this.Router = new router;
			
			//this.isRunning = true;

			
			this.Controllers = {
				Index: new index,
				Timber: new timber,
				About: new about,
				Bad: new bad,
				Lab: new lab,
				Work: new work,
				Asterisk: new asterisk
			};
		
			this.Collections = {
				Game: new game,
				Timber: new timber
			};
		}
	};

	console.log('										...loaded.');
	//return UI;
});