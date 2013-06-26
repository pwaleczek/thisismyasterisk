/*
	@file: main.js
	
	Copyright (c) 2013 Pawel Waleczek [pawel@thisismyasterisk.org], All rights reserved.

	THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF
	ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
	IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR
	PURPOSE.

	Please see the license.txt file for more information.
*/

define([
	'backbone',
	'utils',
//	'engine/engine',
	'ui/ui'
], function(Backbone, Utils) {
	'use strict';
	console.log('Loading Application module...');

	var scope = this;
	var Application = {
		initialize: function () {
			

			//window.Engine = Engine;

			console.log('Application init.');

			//Engine.initialize();

			
			UI.initialize();

			Backbone.history.start({pushState: true});	
		}	
	};

	console.log('										...loaded.');
	
	return Application;

});