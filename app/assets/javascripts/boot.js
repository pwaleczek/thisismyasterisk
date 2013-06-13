/*
	@file: boot.js
	
	Copyright (c) 2013 Pawel Waleczek [pawel@thisismyasterisk.org], All rights reserved.

	THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF
	ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
	IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR
	PURPOSE.

	Please see the license.txt file for more information.
*/

define(function() {
	
	'use strict';

	console.log('Welcome to thisismyasterisk.org!\r\nCopyright 2013, Pawel Waleczek | pawel@thisismyasterisk.org');
	console.log('env is: %s.', env);
	
	// if (env === 'production' || typeof console === 'undefined') {
	//   console = {
	//     log: function() {}
	//   };
	// } 

	console.log('booting thisismyasterisk.org...');
	
	requirejs.onError = function(error) {
		console.log(error);
	}

	var browserFit = function() {
		
		return true;
	};

	var showNotWorkingMessage = function () {
		document.getElementsByTagName('body')[0].innerHTML = '<h1 class="oldBrowser">Get a proper browser!</h1>';
		return console.log('No, seriously, get a proper browser! ');
	}

	if(browserFit()) {	
		define([
			'main',
			'utils',
			'cq',
			'backbone'
		], function(App, Utils, cq, _, Backbone) {
			console.log("Starting application.");
			
			//env = $('meta[name="app_env"]').attr('content');

			window.App = App;
			
			App.initialize();

		});
	} else {
		showNotWorkingMessage();
	}
	console.log('										...done!');

});
