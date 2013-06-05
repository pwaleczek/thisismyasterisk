//	@map module
//  @author: Pawel Waleczek | pawel@thisismyasterisk.org

//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)

define([
	'Logger',
	'Utils',
	'engine/sprite'
], function(Logger, Utils, Sprite) {
	Logger.group('Loading Map module for Engine...');
	//generate random map
	var sqrt3 = Utils.sqrt3;
	var sqrt3h = sqrt3/2;
	var generatedMap = '';
	(function() {
		console.log('making map');
		var map = {
			width: 40,
			height: 40,
			tileset: 'default',
			data: new Array()
		};
		for(var i = 0; i < map.height; i++) {
			map.data[i] = [];
			for(var j = 0; j < map.width; j++) {
				map.data[i][j] = Math.floor(Math.random()*1.5);
			}
		}
		generatedMap = JSON.stringify(map);
		//console.log(generatedMap);
		console.log(map);
	})();
	//static map
	var tempMapData = '{ \
	"width": 28, \
	"height": 28, \
	"tileset": "default", \
	"data": { \
		"accessible": [ \
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0], \
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0], \
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1], \
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1], \
			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,1,1,1,1,1,1,1], \
			[0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1], \
			[0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,0,1,0,1,0,1,1,1,0,1,1,1], \
			[0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,1,0,1,0,1,1,1,0,1,1,1], \
			[0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,0,1,0,1,1,1,0,1,1,1], \
			[0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,1,0,1,1,1,0,1,1,1], \
			[0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,0,1,1,1,0,1,1,1], \
			[0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,1,0,1,0,1,0,1], \
			[0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,0,1,0,1,0,1], \
			[0,0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,0,1,0,1,0,1,0,1], \
			[0,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,0,0,1,0,1,0,1,0,1], \
			[0,0,1,1,1,0,1,1,1,0,1,1,0,0,1,1,0,0,0,0,0,1,0,1,0,1,0,1], \
			[0,1,1,0,1,0,1,0,1,0,1,0,0,1,1,0,0,1,1,0,0,1,1,1,0,1,1,1], \
			[1,1,0,0,1,0,1,1,1,1,1,0,1,1,0,0,1,1,1,0,0,1,0,1,1,1,0,1], \
			[1,1,0,0,1,1,1,1,1,1,1,0,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1], \
			[1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0], \
			[1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,0,0], \
			[1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0], \
			[1,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0], \
			[1,0,1,1,1,1,1,0,0,1,1,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0], \
			[0,0,1,0,0,1,1,0,1,1,1,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0], \
			[0,0,1,1,1,1,1,0,0,1,1,0,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0], \
			[1,1,1,1,1,1,0,0,0,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0], \
			[0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]  \
		], \
		"layout": [ \
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 2, 2, 2, 2, 2, 2, 9,-1,-1,-1], \
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 5, 8, 8, 8, 8, 8, 8, 8, 2, 9,-1], \
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9], \
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 5, 8, 8, 8,14, 8, 8, 8, 8, 8, 8,16], \
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 0, 8, 8, 8,16,-1, 0, 8, 8, 8, 8, 8,16], \
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1,18,18, 5,14, 8,14,16,-1, 0, 8, 8,14, 8, 8,16], \
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 6,-1,-1,17,-1,17,-1,17,-1, 0, 8,16,-1, 0, 8,16], \
			[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 6,-1,-1, 1, 6,-1,17,-1,17,-1, 0, 8,16,-1, 0, 8,16], \
			[-1,-1,-1,-1,-1,-1,-1,-1,-1, 1, 6,-1,-1, 1, 6,-1,-1,17,-1,17,-1, 0, 8,16,-1, 0, 8,16], \
			[-1,-1,-1,-1,-1,-1,-1,-1, 1, 6,-1,-1, 1, 6,-1,-1, 1, 6,-1,17,-1, 0, 8,16,-1, 0, 8,16], \
			[-1,-1,-1,-1,-1,-1,-1, 1, 6,-1,-1, 1, 6,-1,-1, 1, 6,-1,-1,17,-1, 0,14,16,-1, 0,14,16], \
			[-1,-1,-1,-1,-1,-1, 1, 6,-1,-1, 1, 6,-1,-1, 1, 6,-1,-1, 1, 6,-1,17,-1,17,-1,17,-1,17], \
			[-1,-1,-1,-1,-1, 1, 6,-1,-1, 1, 6,-1,-1, 1, 6,-1,-1, 1, 6,-1,-1,17,-1,17,-1,17,-1,17], \
			[-1,-1,-1,-1, 1, 6,-1,-1, 1, 6,-1,-1, 1, 6,-1,-1, 1, 6,-1,-1,-1,17,-1,17,-1,17,-1,17], \
			[-1,-1,-1, 1,16,-1,-1, 1,13,-1,-1, 1, 6,-1,-1, 1, 6,-1,-1,-1,-1,17,-1,17,-1,17,-1,17], \
			[-1,-1, 1,12,16,-1, 1,12,16,-1, 1, 6,-1,-1, 1, 6,-1,-1,-1,-1,-1,17,-1,17,-1,17,-1,17], \
			[-1, 1, 6,-1,17,-1,17,-1,17,-1,17,-1,-1, 1, 6,-1,-1, 1, 9,-1,-1, 0,18,13,-1, 0,18,13], \
			[ 1,13,-1,-1,17,-1, 0, 2, 5, 2,13,-1, 1, 6,-1,-1, 1, 5,16,-1,-1,17,-1, 0, 2,13,-1,17], \
			[ 0,16,-1,-1, 0, 2, 5, 8, 8, 8,16,-1,17,-1,-1, 1, 5, 8,16,-1,-1, 7, 2, 5, 8, 8, 2, 6], \
			[ 0,16,-1,-1, 0, 8, 8, 8, 8, 8, 8, 2, 5, 2, 2, 5, 8, 8,16,-1,-1,-1, 7, 8, 8, 8,15,-1], \
			[ 0,16,-1,-1, 0, 8, 8, 8, 8, 8, 8,14, 8, 8,14,14,14,14,16,-1,-1,-1,-1, 7,14,15,-1,-1], \
			[ 0,14,18,18, 5,14,14,14,14,14,15,-1, 0,16,-1,-1,-1,-1,17,-1,-1,-1,-1,-1,-1,-1,-1,-1], \
			[17,-1,-1,-1,17,-1,-1,-1,-1,-1,-1,-1, 0,15,-1,-1,-1, 1, 6,-1,-1,-1,-1,-1,-1,-1,-1,-1], \
			[10,-1, 1,18,12, 2, 9,-1,-1, 1, 2, 2,13,-1,-1,-1, 1, 6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1], \
			[-1,-1,17,-1,-1, 0,16,-1, 3, 5, 8,14,16,-1,-1, 1, 6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1], \
			[-1,-1, 0, 2, 2, 5,15,-1,-1, 0,16,-1,17,-1, 1, 6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1], \
			[ 3,18, 5, 8, 8,16,-1,-1,-1, 0,16,-1, 0, 2, 6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1], \
			[-1,-1, 7,14,14,14,18,18,18,12,14,18,12,15,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]  \
		] \
	} \
}';
	var Map = {
		initialize: function () {
			this.tw = Engine.sprite.w;
			this.th = Engine.sprite.h;
			this.td = Engine.sprite.d;
			Logger.info('MAP: ', this);
			this.scale = Engine.scale;
			this.isLoaded = false;
		},
		
		load: function(name) {
			Logger.info('Loading map "' + name + '".')
			this.mapData = JSON.parse(tempMapData);
			Utils.imagePreloader([this.mapData.tileset + '_tileset'], function(imageList) {
				Logger.info('imageList', imageList);
				Map.spriteList = new Sprite('tileset', imageList[Map.mapData.tileset + '_tileset'], 38, 28);
				console.log(Map.spriteList);
				Map.isLoaded = true;
				Map.draw();
			});
			
			//Logger.info(this.mapData);
			// function parseData(data) {
			// }
		},
		
		refresh: function () {
			this.tw = Engine.sprite.w;
			this.th = Engine.sprite.h + Engine.sprite.d;
			this.scale = Engine.scale;
			//Logger.info(this.tw, this.th, this.scale);
		},

		draw: function() {
			if(this.isLoaded) {
				console.log('drawing');
				var _map = this;
				var scale = this.scale;
				


				var offset = this.tw * this.mapData.width/2,
					mapCanvas = cq(this.mapData.width * this.tw + this.tw/2, this.mapData.height * 2*this.th);
					Logger.info('mapCanvas', mapCanvas, this, scale);

				//console.log(Map.spriteList);
				for(var i = 0; i < this.mapData.width; i++)
					for(var j = 0; j <  this.mapData.height; j++) {
						var x = j * this.tw/2 - i * (this.tw/2) + offset;
						var y = j * (this.th/2) + i * (this.th/2);
						if(this.mapData.data.accessible[i][j]) {
							//console.log( j + ':' + i + ' -> ' + this.mapData.data.layout[j][i]);
							//console.log(Map.spriteList[parseInt(this.mapData.data.layout[j][i])].toDataURL());
							mapCanvas.drawImage(Map.spriteList[this.mapData.data.layout[i][j]], 0, 0, this.tw, this.th + this.td, x, y, this.tw, this.th + this.td);
						}
					} 
			
				console.log(mapCanvas.canvas.toDataURL());
				this.canvas = mapCanvas.canvas;
			}
		}
	}
	
	Logger.info('-> ', Map);
	Logger.groupEnd();
	return Map;
});