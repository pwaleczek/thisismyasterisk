//	@app main thread
//  @author: Pawel Waleczek | pawel@thisismyasterisk.org

define([
	'Logger',
	'Backbone',
	'Utils',
// @app files
	// 'engine/user',
	// 'engine/server',
	'engine/engine'
	//'engine/map'

], function(Logger, Backbone, Utils,  Engine) {
	'use strict';
	var scope = this;
	var Application = {
		initialize: function () {
			if(this.browserFit()) {

				window.Engine = Engine;
				//window.Utils = Utils;
				Logger.group('Application init.');
				
				this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);

				Engine.initialize();

				

				Backbone.history.start();

				//console.log(Engine);
			} else {
				this.showNotWorkingMessage();
			}
			Logger.groupEnd(); // [Application init]
		},

		browserFit: function() {
			return true;
		},

		showNotWorkingMessage: function () {
			$('body').append('<h1>Not supported</h1>');
			return;
		}
	};
	return Application;

});