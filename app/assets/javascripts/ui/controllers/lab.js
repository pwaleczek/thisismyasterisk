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
	'text!ui/views/lab.html',
], function (Utils, Backbone, _, view) {
	
	console.log('Loading timber controller module for UI...');
	
	var Lab = Backbone.View.extend({
		el: '.contents',

		name: 'lab',

		events: {
			'click #labList .labElem'	: 'loadLabView'
		},

		template: _.template(view),

		initialize: function (options) {
			this.collection.bind('reset', this.render, this);
			this.collection.bind('add', this.addLogToList, this);
			var _this = this;
			$(document).on('click', '.labElem', function(event) {
				var id = $(event.target).attr('id');
				_this.loadLabView(id);
			});
		},

		render: function() {
			var _template = this.template;
			var _name = this.name;
			var _this = this;
			
			$('.contents').fadeOut(UI.speed, function() {
				$('body').attr('class', '').addClass(_name);				
				$('ul a#' + _name).addClass('active');
				$('.contents').html(_template).fadeIn(UI.speed, function() {
						_this.collection.each(function(labElem){
							var view = new UI.Controllers.LabElem({model: labElem});
							console.log(labElem);
							console.log(view.render().el);
							$('#labList').append(view.render().el);
						});				

				});
			});
		
			return this;
		},

		loadLabView: function(labId) {
			window.open('http://static.thisismyasterisk.org/labs/' + labId + '/', '_blank');
		},
	
	});
	console.log('										...loaded.');
	return Lab;
});