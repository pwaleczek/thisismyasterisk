if( !window.jQuery ) {
	define(['Logger', 'lib/jquery/jquery-min'], function (Logger) {
		Logger.group('Loading jQuery...');
		Logger.info('-> ', $);
		Logger.groupEnd();
		return $;
	});
}