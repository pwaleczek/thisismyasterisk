/*
	@file: index.js
	
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
	'text!ui/views/index.html'
], function (Utils, Backbone, _, view) {
	
	console.log('Loading index controller module for UI...');
	
	var Index = Backbone.View.extend({
		el: 'body',

		template: _.template(view),

		events: {
			'click ul a'			: 'loadPage'
		},

		initialize: function (options) {
			//this.render();
			$(document).on('click', '#index ul a', this.loadPage);
		},

		render: function(callback) {

			if(!UI.isRunning)	{
				var _template = this.template;

				$(this.el).fadeOut(UI.speed, function() {
					$(this).html(_template).fadeIn(UI.speed, function() {
						UI.isRunning = true;
						callback();
					});
				});
			} else {
				callback();
			}
		},

		loadPage: function(event) {
			$('ul a').removeClass('active');

			var id = $(event.target).attr('id');
			
			var page = (id == 'timber') ? '' : id;
			UI.Router.navigate(page, true);
		}

	});
	console.log('										...loaded.');
	return Index;
});