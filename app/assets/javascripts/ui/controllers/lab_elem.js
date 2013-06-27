/*
	@file: labElem.js
	
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
	'text!ui/views/lab_elem.html'
], function (Utils, Backbone, _, view) {
	
	console.log('Loading lab element controller module for UI...');
	
	var LabElem = Backbone.View.extend({

		template: _.template(view),

		initialize: function (options) {

		},

		render: function() {
			var _template = this.template;
			var model = this.model;
				console.log('render entry');
				console.log(model);
			$(this.el).html(_template({labElem: model}));

			return this;
		}
	});
	console.log('										...loaded.');
	return LabElem;
});