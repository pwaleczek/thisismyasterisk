//	@sprite module
//  @author: Pawel Waleczek | pawel@thisismyasterisk.org
define([
	'Logger',
], function(Logger) {
	var Sprite = function(type, image, w, h) {
		if(typeof image !== 'Image') {
			Logger.error('No proper image given!');
			return;
		} else {
			// switch(type) {
			// 	case 'tileset':
			// 		var tileList = [];



			// 	break;
			// 	case 'item':

			// 	break;
			// 	case 'player':

			// 	break;
			}
	}
	Sprite.prototype = {
		render: function() {
			
		}
	}

	Logger.info('-> ', Sprite);
	Logger.groupEnd();
	return Sprite;
});