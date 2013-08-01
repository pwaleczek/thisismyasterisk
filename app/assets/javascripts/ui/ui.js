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
	'utils',
	'ui/router',
	'ui/background',
	// models and collections
	'ui/collections/timber',
	'ui/collections/lab',

	// controllers
	'ui/controllers/index',
	'ui/controllers/timber',
	'ui/controllers/log',
	'ui/controllers/bad',
	'ui/controllers/about',
	'ui/controllers/work',
	'ui/controllers/asterisk',
	'ui/controllers/lab',
	'ui/controllers/lab_elem',
	'ui/controllers/cookie_note'

], function (_, Utils, router, background, timberCollection, labCollection, index, timber, log, bad, about, work, asterisk, lab, labElem, cookieNote) {
	console.log('Loadeing UI...');
	
	window._UI = function() {
		console.log('starting ui init. cookies %s', localStorage['cookiesPolicyAccepted']);
		console.log('mobile: %s, handheld: %s', this.isMobile, this.isHandheld);
		console.log(navigator.userAgent);
		
		this.Router = new router();
		
		this.Background = new background();

		// Collections
		_.extend(this, { 
			Collections: {
				Timber: new timberCollection(),
				Lab: new labCollection()
			}
		});
		
		// Controllers
		_.extend(this, { 
			Controllers: {
				Index: new index(),
				Timber: new timber({collection: this.Collections.Timber}),
				About: new about(),
				Bad: new bad(),
				Lab: new lab({collection: this.Collections.Lab}),
				Work: new work(),
				Asterisk: new asterisk(),
				Log: log,
				LabElem: labElem,
				CookieNote: new cookieNote()
			}
		});

		//console.log(Backbone.history.fragment);

	}

	window._UI.prototype = {
		
		speed: 200, // transitions base speed
		isRunning: false,

		cookiesPolicyAccepted: parseInt(localStorage['cookiesPolicyAccepted']),

		isMobile: /Android|webOS|iPad/i.test(navigator.userAgent),
		isHandheld: /Mobile|Phone|iPod|BlackBerry/i.test(navigator.userAgent),
		
		fetchTimberCount: 0,
		fetchTimberInProgress: 0,

		fetchLabCount: 0,
		fetchLabInProgress: 0,

		

		Links: {
			GitHubIssues: 'http://github.com/pwaleczek/thisismyasterisk/issues',
			GitHub: 'http://github.com/pwaleczek',
			LinkedIn: 'http://pl.linkedin.com/pub/pawe%C5%82-waleczek/53/316/533',
			facebook: 'http://facebook.com/pawel.waleczek'
		},

		Navigate: function(page, trigger) {
			console.log('current: %s, next: %s', this.CurrentPage, page);
			trigger = trigger || true;
			if(this.CurrentPage == 'asterisk') {
				console.log('clearing!!!!!');
				UI.Background.clearCanvas = true;
				UI.Background.textsOpacity = 0;
			//	clearInterval(UI.Background.textsInterval);
			}
			this.Router.navigate(page, trigger);
			this.CurrentPage = page;
			
		}
			
	}

	console.log('										...loaded.');

});