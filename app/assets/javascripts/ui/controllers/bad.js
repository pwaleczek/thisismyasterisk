/*
	@file: bad.js
	
	Copyright (c) 2013 Pawel Waleczek [pawel@thisismyasterisk.org], All rights reserved.

	THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF
	ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
	IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR
	PURPOSE.

	Please see the license.txt file for more information.
*/

define([
	'utils',
	'backbone',
	'underscore',
	'text!ui/views/bad.html'
], function (Utils, Backbone, _, view) {
	
	console.log('Loading bad controller module for UI...');
	
	var Bad = Backbone.View.extend({
		el: 'body',
		
		events: {
			'click a#goHome'			: 'home',
			'click a#bugReport'		: 'bugReport'
		},

		template: _.template(view),

		initialize: function (options) {
			
		},

		render: function() {
			UI.isRunning = false;
			var _template = this.template;
			$(this.el).fadeOut(UI.speed, function() {
				$('body').attr('class', '').addClass('bad');
				$(this).html(_template).fadeIn(UI.speed);
			});
			
		},
		
		home: function() {
			UI.Router.navigate('', true);
		},

		bugReport: function() {
			window.open(UI.Links.GitHubIssues);
			UI.Router.navigate('', true);
		}

	});
	console.log('										...loaded.');
	return Bad;
});