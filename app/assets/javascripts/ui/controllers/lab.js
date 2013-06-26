/*
	@file: lab.js
	
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
	'text!ui/views/lab.html'
], function (Utils, Backbone, _, view) {
	
	console.log('Loading timber controller module for UI...');
	
	var Lab = Backbone.View.extend({
		el: '.contents',

		name: 'lab',

		template: _.template(view),

		initialize: function (options) {

		},

		render: function() {
			var _template = this.template;
			var _name = this.name;
				
				$('.contents').fadeOut(UI.speed, function() {
					$('body').attr('class', '').addClass(_name);
					$('ul a#' + _name).addClass('active');
					$('.contents').html(_template).fadeIn(UI.speed);
				});
		}
	});
	console.log('										...loaded.');
	return Lab;
});