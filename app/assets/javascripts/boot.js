// @app bootstrap
// @author Pawel Waleczek | pawel@thisismyasterisk.org

'use strict';

// requirejs.config({
// 	paths: {
// 		Logger: 'lib/console/console',
// 		Utils: 'utils/utils',
// 		CQ: 'lib/cq/cq',
// 		jQuery: 'lib/jquery/jquery',
// 		Underscore: 'lib/underscore/underscore',
// 		Backbone: 'lib/backbone/backbone'
// 	},
// 	priority: [ 
// 		'Logger',
// 		'Utils',
// 		'CQ',
// 		'jQuery',
// 		'Underscore',
// 		'Backbone',
// 	],
// 	urlArgs: ''//v=0.1-' + new Date().getTime()
// });

require([
	'require',
	'Logger',
	'Utils',
	'CQ',
	 'Underscore',
	 'Backbone'
], function(require, Logger, Utils, cq, _, Backbone) {
	Logger.group('Libs loaded, booting...');
	Logger.info('Logger: ', Logger);
	Logger.info('Utils: ', Utils);
	Logger.info('CQ: ', cq);
	Logger.info('Underscore: ', _);
	Logger.info('Backbone: ', Backbone);

	require(['main'], function(App) {
		Logger.group("Starting application.");
		Logger.info("App: ", App);

		App.initialize();
		
		Logger.groupEnd();
	});

	Logger.groupEnd();
});
