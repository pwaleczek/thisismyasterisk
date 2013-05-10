define(['Logger', 'lib/backbone/backbone-min'], function (Logger, Backbone) {
	Logger.group('Loading Backbone...');
	Logger.info('-> ', Backbone);
	Logger.groupEnd();
	return Backbone;
});