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
	'ui/controllers/lab_elem'

], function (_, router, timberCollection, labCollection, index, timber, log, bad, about, work, asterisk, lab, labElem) {
	console.log('Loadeing UI...');
	window.UI = {
		
		speed: 200, // transitions base speed
		isRunning: false,

		isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),
		isHandheld: /Mobile|iPhone|iPod|BlackBerry/i.test(navigator.userAgent),
		
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
		
		Collections: {},
		Controllers: {},
		
		Router: {},
		
		initialize: function() {
			console.log('starting ui init.');
			console.log('mobile: %s, handheld: %s', this.isMobile, this.isHandheld);
			
			this.Router = new router;
			
			// Collections
			this.Collections = {
				Timber: new timberCollection,
				Lab: new labCollection
			};
			
			// Controllers
			this.Controllers = {
				Index: new index,
				Timber: new timber({collection: this.Collections.Timber}),
				About: new about,
				Bad: new bad,
				Lab: new lab({collection: this.Collections.Lab}),
				Work: new work,
				Asterisk: new asterisk,
				Log: log,
				LabElem: labElem
			};
		

		}
	};

	console.log('										...loaded.');

});