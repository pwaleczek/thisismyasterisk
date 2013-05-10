define(['Logger', 'lib/three/three-min'], function (Logger) {
	Logger.group('Loading THREE [three.js 3d lib]...');
	Logger.info('-> ', THREE);
	Logger.groupEnd();
	return THREE;
});