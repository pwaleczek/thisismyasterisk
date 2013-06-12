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
	'Logger',
	'Utils',
	'Backbone',
	'underscore',
], function (Logger, Utils, Backbone, _) {
	Logger.info('indexController');
	var Index = Backbone.View.extend({
		el: 'body',

		template: _.template(require('text!ui/views/index.jst'), {} ),

		initialise: function (options) {
			this.render();
		},

		render: function() {
			$(this.el).append(this.template);
		}
	});
	return Index;
});