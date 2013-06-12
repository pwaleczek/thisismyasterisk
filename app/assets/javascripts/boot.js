/*
	@file: boot.js
	
	Copyright (c) 2013 Pawel Waleczek [pawel@thisismyasterisk.org], All rights reserved.

	THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF
	ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
	IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR
	PURPOSE.

	Please see the license.txt file for more information.
*/

'use strict';

var env;

require([
	'require',
	'logger',
	'utils',
	'cq',
	'backbone'
], function(require, Logger, Utils, cq, _, Backbone) {
	Logger.group('Libs loaded, booting...');
	Logger.info('Logger: ', Logger);
	Logger.info('Utils: ', Utils);
	Logger.info('CQ: ', cq);
	Logger.info('Backbone: ', Backbone);

	require(['main'], function(App) {
		Logger.group("Starting application.");
		Logger.info("App: ", App);
		
		env = $('meta[name="app_env"]').attr('content');

		window.App = App;
		
		App.initialize();
		
		Logger.groupEnd();
	});

	Logger.groupEnd();
});
