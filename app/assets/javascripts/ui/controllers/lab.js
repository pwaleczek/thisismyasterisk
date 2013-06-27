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

			$(document).on('click', '.labElem', function(event) {
				var id = $(event.target).attr('id');
				UI.Router.navigate('lab/' + id, true);
			});
			$(document).on('click', 'a#backButton', this.goBack);
			//this.
		},

		render: function(loadView) {
			
			var _template = this.template;
			var _name = this.name;
			var _this = this;
			$('.contents').fadeOut(UI.speed, function() {
				$('body').attr('class', '').addClass(_name);
				$('ul a#' + _name).addClass('active');
				$('.contents').html(_template).fadeIn(UI.speed, function() {
					if(loadView) {
						_this.loadLabView(loadView);
					}
					_this.collection.each(function(labElem){
						var view = new UI.Controllers.Log({model: labElem});
						console.log(log);
						console.log(view.render().el);
						$('#labList').append(view.render().el);
					});
				});
			});
			return this;
		},

		loadLabView: function(labId) {
			
			var backButton = '<a id="backButton">go back</a>';
			var labList = {
				isoDev: {
					body: '<script type="text/javascript" src="/labs/engine_proto/engine.js"></script>'
				},
				js1k: {
					body: '<script type="text/javascript" src="/labs/js1k/shim.js"></script><canvas id="c"></canvas>'
				}
			}
			// console.log(this.labList);
			
			$('#labView').fadeOut(UI.speed, function() {
				
				if(UI.Collections.Lab.get(labId)) {
					$(this).html(UI.Collections.Lab.get(labId).view + backButton).fadeIn(UI.speed);
				} else {
					UI.Router.navigate('bad', true);
				}
				$('body').attr('class', '').addClass('labView');
			});
			
			
		},

		goBack: function(event) {
			console.log('go back!');
			
			UI.Router.navigate('lab', true);
			 $('#labView').fadeOut(UI.speed, function() {
			 	//$('body').attr('class', '').addClass('lab');
			 	$(this).html('').fadeIn(UI.speed);
		 });
		}
	});
	console.log('										...loaded.');
	return Lab;
});