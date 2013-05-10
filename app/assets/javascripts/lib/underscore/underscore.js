define(['Logger', 'lib/underscore/underscore-min'], function (Logger, _) {
	Logger.group('Loading Underscore...');
	Logger.info('-> ', _);
	Logger.groupEnd();
	return _;
});