/*
	@file: timber.js
	
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
], function (Utils, Backbone, _) {
	
	console.log('Loading timber controller module for UI...');
	
	var Timber = Backbone.View.extend({
		el: '.contents',

		name: 'timber',

		initialize: function (options) {
			this.collection.bind('reset', this.render, this);
			this.collection.bind('add', this.addLogToList, this);
		},

		render: function() {
			var _name = this.name;
			var _collection = this.collection;
			$('.contents').fadeOut(UI.speed, function() {
				$('.contents').html('');
				$('body').attr('class', '').addClass(_name);
				$('ul a#' + _name).addClass('active');			
				_collection.each(function(log) {
					var view = new UI.Controllers.Log({model: log});
					console.log(log);
					console.log(view.render().el);
					$('.contents').append(view.render().el);
				});
				if(_collection.length == 0) {
					$('.contents').append('<h3 class="noBorder" style="margin-top: 2em;"><span class="pink">Whoops</span></h3><p>There\'s nothing to render, probaly no entries were found.</p>');
				}
				$('.contents').fadeIn(UI.speed);
			});
		},

		loadMore: function() {
			UI.Collections.Timber.fetch({
				update: true,
				data: {
					offset: UI.Collections.Timber.length
				}
			});
		}

	});
	console.log('										...loaded.');
	return Timber;
});