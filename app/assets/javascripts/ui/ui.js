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
	'logger',
	'engine/engine',
	'ui/router',
	// // models and collections
	// 'ui/models/game',
	// 'ui/models/' 

	// controllers
	'ui/controllers/index'
], function (Logger, Engine, router, index) {
	Logger.info('iu..');
	window.UI = {
		Views: {
			Index: new index
		},
		Models: {},
		Controllers: {},
		Router: router,
		initialize: function() {}
	};
	//return UI;
});