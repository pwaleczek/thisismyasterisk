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
	'Logger',
	'Backbone',
	'Utils',
	'engine/engine',
	'ui/ui'

], function(Logger, Backbone, Utils,  Engine, UI) {
	'use strict';
	var scope = this;
	var Application = {
		initialize: function () {
			console.log('Welcome to thisismyasterisk.org!\r\nCopyright 2013, Pawel Waleczek | pawel@thisismyasterisk.org');
			if(this.browserFit()) {

				window.Engine = Engine;

				Logger.group('Application init.');
				
				this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);

				//Engine.initialize();

				if (this.env === 'production' || typeof window.console === 'undefined') {
				  window.console = {
				    log: function() {}
				  };
				  Logger.setLevel(0);
				} 
				console.log(UI);
				this.router = new UI.Router;

				Backbone.history.start({pushState: true});


			} else {
				this.showNotWorkingMessage();
			}
			Logger.groupEnd(); // [Application init]
		},

		browserFit: function() {
			
			return true;
		},

		showNotWorkingMessage: function () {
			$('body').append('<h1>Not supported</h1>');
			return console.log('.. get a proper browser!');
		}
	};
	return Application;

});