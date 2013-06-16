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
	'engine/engine',
	'underscore'
	'ui/router',
	// models and collections
	'ui/collections/game',
	'ui/collections/timber',

	// controllers
	'ui/controllers/index',
	'ui/controllers/about'
], function (Engine, _, router, game, timber, index, about) {
	console.log('Loadeing UI...');
	window.UI = {
		
		isRunning: false,

		Controllers: {},
		Collections: {},

		Router: null
		
		initialize: function() {
			console.log('starting ui init.');
			
			this.Router = new router;
			
			this.isRunning = true;
			
			this.Controllers = {
				Index: new index,
				About: new about
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