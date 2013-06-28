/*
	@file: cookie_note.js
	
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
	'text!ui/views/cookie_note.html'
], function (Utils, Backbone, _, view) {
	
	console.log('Loading about controller module for UI...');
	
	var CookieNote = Backbone.View.extend({
		el: 'body',

		name: 'cookie_note',
		
		events: {
			'click #closeCookieNote' : 'closeCookieNote'
		},
		
		template: _.template(view),

		initialize: function (options) {

		},

		render: function() {
			
			var _template = this.template;
			var _name = this.name;

				$(this.el).prepend(this.template);
		},

		closeCookieNote: function() {
			$('section.cookieNote').addClass('closing');
			localStorage.setItem('cookiesPolicyAccepted', '1');
			setTimeout(function() {
				$(this).remove();
			}, UI.speed);
		}
	});
	console.log('										...loaded.');
	return CookieNote;
});