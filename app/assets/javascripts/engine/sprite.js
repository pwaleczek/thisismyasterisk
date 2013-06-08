//	@sprite module
//  @author: Pawel Waleczek | pawel@thisismyasterisk.org
define([
	'Logger',
], function(Logger) {
	var Sprite = function(type, image, w, h) {
		// if(typeof image !== 'Image' || typeof image !== 'object') {
		// 	Logger.error('No proper image given!', typeof image);
		// 	return;
		// } else {
			var tileList = [];
			var sImageW = (image.width / w) |0; 
			var sImageH = (image.height / h) |0;
			switch(type) {
				case 'tileset':
					for(var j = 0; j < sImageH; j++) {
						for(var i = 0; i < sImageW; i++) {
							var scw = cq(w, h);
							//scw.strokeRect(0, 0, w, h);
							scw.drawImage(image, i * w, j * h, w, h, 0, 0, w, h);
							//console.log(scw.canvas.toDataURL());
							tileList.push(scw.canvas);
						}
					}

				break;
				case 'item':

				break;
				case 'player':
					for(var j = 0; j < sImageH; j++) {
						tileList[j] = [];
						for(var i = 0; i < sImageW; i++) {
							var scw = cq(w, h);
							//scw.strokeRect(0, 0, w, h);
							scw.drawImage(image, i * w, j * h, w, h, 0, 0, w, h);
							//console.log(scw.canvas.toDataURL());
							tileList[j].push(scw.canvas);
						}
					}
				break;
			}
			
			//console.log(tileList);
			return tileList;
		// }
	}
	Sprite.prototype = {
		//list: new Array,

		render: function() {
			
		}
	}

	Logger.info('-> ', Sprite);
	Logger.groupEnd();
	return Sprite;
});