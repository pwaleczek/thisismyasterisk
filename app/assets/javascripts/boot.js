/*
	@file: boot.js
	
	Copyright (c) 2013 Pawel Waleczek [pawel@thisismyasterisk.org], All rights reserved.

	THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF
	ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
	IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR
	PURPOSE.

	Please see the license.txt file for more information.

*/
	'use strict';

	console.log('Welcome to thisismyasterisk.org!\r\nCopyright 2013, Pawel Waleczek | pawel@thisismyasterisk.org');
	console.log('env is: %s.', env);
	
	if (env === 'production' || typeof console === 'undefined') {
	  console = {
	    log: function() {}
	  };
	} 

	console.log('booting thisismyasterisk.org...');
	
	requirejs.onError = function(error) {
		console.log(error);
	}

	var browserFit = function() {

		if(/localstorage|csstransitions|canvas/i.test(document.getElementsByTagName('html')[0].className))
			return true;

		return false;
	};

	var showNotWorkingMessage = function () {
		document.getElementsByTagName('body')[0].innerHTML = '<h1 class="oldBrowser" style="margin-left: 1em;">Get a proper browser!</h1>';
		document.getElementsByTagName('body')[0].style.display = 'block';
		return console.log('No, seriously, get a proper browser! ');
	}

	if(browserFit()) {	
		require([
			'utils',
			'underscore',
			'backbone',
			'cq',
			'ui/ui'
		], function(Utils, _, Backbone, cq) {
			console.log("Starting application.");
			
			//env = $('meta[name="app_env"]').attr('content');
			UI.initialize();
			window.cq = cq;
			Backbone.history.start({pushState: true});	

		});
	} else {
		showNotWorkingMessage();
	}
	console.log('										...done!');