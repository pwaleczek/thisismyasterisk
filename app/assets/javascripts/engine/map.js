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
		console.log(generatedMap);
		console.log(map);
	})();
	//static map
	var tempMapData = '{"width":40,"height":40,"tileset":"default","data":[[0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,1,1,0,1,0,0,1,0,1,1,0,1,1,0,0,1],[1,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,0,0],[0,0,1,1,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,1,1,1,0,0,1,0,1,0,0,0,1],[0,0,1,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,1,1,1,0,0,1,0,0,1,1,0,1,1,1,0,1,1,0,0,1,0,1],[0,0,1,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,1,1,0,1,1,0,0,0,1,0,0,0,0,0,1],[0,0,0,0,1,0,0,0,1,0,1,1,1,0,1,0,0,0,1,0,1,0,0,1,1,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0],[1,0,0,1,1,1,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,0,1,1,0,0,1,1,1,1,0,0,1,1,1,0],[0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1,0,1,0,0,1,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0],[1,1,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,1,0,0],[0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,1,1,1,0,0],[1,0,1,1,0,0,1,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,1,0,1,0,1,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,1,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0],[0,0,1,0,0,0,0,1,0,1,1,0,1,0,1,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,1,1,1,0,0,0,0,0,0],[0,0,1,1,1,0,1,1,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,0,1,1,0,1,0,0,1,0,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,1,1,1,0,1,0,1,0,0,1,0,0,1,1,0,0,0,1,0,0,0,1,1,0,0,1,0,1,0,1,0,1,0],[0,0,0,0,0,0,1,0,0,0,1,1,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,1,1,1,0,0,0],[1,1,0,0,0,0,0,0,1,0,0,1,0,1,0,1,1,0,0,1,0,1,0,0,1,0,1,0,1,0,0,0,1,0,0,1,0,0,0,0],[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0],[1,1,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,1,1,1,0,1,0,0,0,0,0,1,1,1,0,0,1,0,1,1,1,1,0,0],[1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,1,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,0,0,1,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],[1,0,1,1,0,1,0,1,0,1,1,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,1,1,0,0,1],[0,1,0,0,1,0,0,0,1,0,1,1,1,0,1,1,0,1,0,0,1,0,1,1,0,0,1,0,0,0,1,0,0,0,0,1,1,0,1,1],[0,0,1,1,1,0,0,0,0,0,0,0,1,0,1,1,1,0,0,0,1,1,1,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,0],[0,1,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,0,1,0,1,1,1,1,0,1,0,0,0,1,0,0,1],[0,1,0,1,0,0,1,0,0,1,0,1,1,0,0,0,1,0,0,1,1,1,0,1,0,0,1,1,0,1,1,0,1,1,1,0,1,1,0,0],[1,1,0,1,1,0,0,0,0,0,1,0,0,1,0,1,1,0,1,0,1,1,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0],[0,1,0,0,1,1,0,0,0,1,0,0,1,0,1,0,0,1,0,1,1,0,0,1,0,1,0,0,0,0,1,0,1,1,0,0,1,0,1,0],[0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,0,0,0],[0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,1,1,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,1,0],[0,1,0,1,0,1,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,1,0,0],[0,0,0,0,1,0,0,0,1,1,0,0,1,1,0,0,0,1,1,0,1,1,1,0,0,0,0,1,0,1,0,0,1,0,1,0,0,0,0,0],[0,0,1,1,1,1,1,0,1,1,1,0,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,0,1,1,1,0,1,0,0,0,0,1,0,0],[0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,0],[0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,0,0],[1,0,1,0,0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,0,0,0,1,0,0,1,1,0,0,0,0,1,0,1,0,0,1,1,0],[0,0,0,0,1,1,0,1,1,0,0,0,1,1,1,1,1,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,0,0,1],[0,0,0,0,0,1,0,1,0,1,1,1,1,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,1,0,1,1,0,0,1,1,1,0,0,0],[0,0,1,0,0,1,0,0,0,0,0,1,0,1,0,0,1,0,0,0,1,1,1,0,1,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0],[0,0,1,0,0,1,0,0,0,0,0,0,0,1,1,1,1,1,0,0,1,0,0,0,0,0,0,1,0,1,1,1,1,0,1,1,0,0,0,0]]}';
	var Map = {
		initialize: function () {
			this.tw = Engine.sprite.w;
			this.th = Engine.sprite.h;
			Logger.info('MAP: ', this);
			this.scale = Engine.scale;
		},
		
		load: function(name) {
			Logger.info('Loading map "' + name + '".')
			
			this.mapData = JSON.parse(tempMapData);
			//Logger.info(this.mapData);
			// function parseData(data) {
			// }
		},
		
		refresh: function () {
			this.tw = Engine.sprite.w;
			this.th = Engine.sprite.h;
			this.scale = Engine.scale;
			Logger.info(this.tw, this.th, this.scale);
		},

		draw: function() {
			console.log('drawing');
			var _map = this;
			var scale = this.scale;
			function makeTiles() {	
				var tileSetList = [];
				var tcw = cq(_map.tw | 0, _map.th | 0)
				.fillStyle('#3d444c')
				//.strokeRect(0, 0, _map.tw | 0, _map.th | 0)
				.save()
				//.translate(5, 5)
				.strokeStyle("#30363c")
				.lineWidth(scale/15)
				.lineJoin('round')
				.beginPath()
				.moveTo(0, (0.5 * scale) | 0)
				.lineTo((sqrt3h * scale) | 0, scale | 0)
				.lineTo((sqrt3 * scale) | 0, (0.5 * scale) | 0)
				.lineTo((sqrt3h * scale) | 0, 0)
				.lineTo(0, (0.5 * scale) | 0)
				.closePath()
				.fill()
				.restore();

				tileSetList.push(tcw);
				


				tcw = cq(_map.tw | 0, _map.th | 0)
				.fillStyle('#3d444c')
				//.strokeRect(0, 0, _map.tw | 0, _map.th | 0)
				.save()
				//.translate(5, 5)
				.strokeStyle("#30363c")
				.fillStyle("#30363c")
				.lineWidth(scale/15)
				.lineJoin('round')
				.beginPath()
				.moveTo(0, (0.5 * scale) | 0)
				.lineTo((sqrt3h * scale) | 0, scale | 0)
				.lineTo((sqrt3 * scale) | 0, (0.5 * scale) | 0)
				.lineTo((sqrt3h * scale) | 0, 0)
				.lineTo(0, (0.5 * scale) | 0)
				.closePath()
				.stroke()
				.fill()
				.restore();
				
				tileSetList.push(tcw);
				
				return tileSetList;
			}

			var tiles = makeTiles(),
				offset = this.tw * this.mapData.width/2,
				mapCanvas = cq(this.mapData.width * this.tw + this.tw/2, this.mapData.height * 2*this.th);
				Logger.info('mapCanvas', mapCanvas, this, scale);

			for(var i = 0; i < this.mapData.width; i++) {
				for(var j = 0; j <  this.mapData.height; j++) {
					var x = i * this.tw/2 - j * this.tw/2 + offset;
					var y = i * this.th/2 + j * this.th/2;
					if(!this.mapData.data[i][j]) mapCanvas.drawImage(tiles[0].canvas, x, y);
				} 
			}
			this.canvas = mapCanvas.canvas;
		}
	}
	
	Logger.info('-> ', Map);
	Logger.groupEnd();
	return Map;
});