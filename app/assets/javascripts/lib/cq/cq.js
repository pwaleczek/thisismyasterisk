define(['logger', 'lib/cq/canvasquery'], function (Logger) {
	Logger.group('Loading CanvasQuery...');
	Logger.info('-> ', cq);
	Logger.groupEnd();
	return cq;
});