/*
	@file: router.js
	
	Copyright (c) 2013 Pawel Waleczek [pawel@thisismyasterisk.org], All rights reserved.

	THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF
	ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
	IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR
	PURPOSE.

	Please see the license.txt file for more information.
*/
define([
	'Logger',
	'Utils',
	'Backbone',
	
], function (Logger, Utils, Backbone) {
	
	Logger.group('Loading UI.Router...');
	
	UI.Router = Backbone.Router.extend({

		initialize: function(options) {
			UI.initialize();
		},

		routes: {
			''				: 'index',
			'about'			: 'about',
			'timber'		: 'timber',
			'lab'			: 'lab'
		},

		index: function() {

		},

		about: function() {

		},

		timber: function() {

		},

		lab: function() {

		}

	});
	Logger.groupEnd();

});