
/*
	@file: engine.js
	
	Copyright (c) 2013 Pawel Waleczek [pawel@thisismyasterisk.org], All rights reserved.

	THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF
	ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
	IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR
	PURPOSE.

	Please see the license.txt file for more information.
*/

define([
	'Logger',
	'Utils',
	'CQ',
	'engine/map',
	'engine/sprite',
	'engine/user',
	'engine/server'
], function (Logger, Utils, cq, Map, Sprite, User, Server) {
	
	Logger.group('Loading Engine...');

	var sqrt3 = Utils.sqrt3;
	var sqrt3h = sqrt3/2;
	// var tileSize = Math.sqrt(Math.pow(46/2, 2)+Math.pow(23/2, 2));
	var scale = 20;//Math.min(window.innerWidth, window.innerHeight) / 10 //40;

	//var activeTilesList = new Array([24, 19], [17, 19], [0, 23]);

	var activeTilesList = [[24, 19, 'marker [24, 19] - you are here. Do it again.'], [17, 19, 'marker [17, 19] - you are here.'], [0, 23, 'marker [0, 23] - you are here. Go for the next one.']];



	Engine = {
		scale: scale,
		sprite: {
			w: 38,
			h: 28 -6,
			d: 6
		},
		label: '',
		entitiesList: {},
		name: 'Engine',
		time: 0,
		mapMove: false,
		mouseDownPos: {
			x: 0,
			y: 0
		},

		worldOffset: {
			x: 0,
			y: 0
		},
		//'rgba(119,108,90, 0.3)'
		makeTile: function (image, x, y) {
			var tile = cq(this.sprite.w, this.sprite.h)
			//console.log(image);
			tile.drawImage(image, x, y, this.sprite.w, this.sprite.h, 0, 0, this.sprite.w, this.sprite.h);
			return tile.canvas;
		},

		initialize: function () {
			
			var _engine = this;
			this.User = User;
			this.renderCanvas = cq();
			this.Map = Map;
			this.buffer = cq(window.innerWidth, window.innerHeight);
			this.cursorPosition = {
				x: 0,
				y: 0
			}
			document.body.appendChild(this.renderCanvas.canvas);
			
			
			Utils.attachEvent(window, 'resize', this.resize);
			Map.initialize();
			
			this.Map.load('temp');
			
			this.images = Utils.imagePreloader(['cube','mark_tiles'], function (imageList) {
				//_engine.Map.draw();
			//	console.log('loaded');
				_engine.resize();
				Server.connect(function (playerUID, users) {
					Logger.info('server data', playerUID, users);

					var _player = users[playerUID];

					for(var UID in users) {
						if(users[UID].uid !== playerUID) {
							var _user = users[UID];
							//console.log(_user);
							new User('user', _user.uid, _user.position, _user.color);
						
						}
					}
					_engine.player = new User('player', _player.uid, _player.position, _player.color);
					//_engine.player.generateSprites();
					//console.log(_player);
					Utils.attachEvent(window, 'blur', function (event) {
						Logger.info('got Blur event', event);
						_engine.player.active = false;
						Server.socket.emit('player_active_state', _engine.player.active);
					});
					
					Utils.attachEvent(window, 'focus', function (event) {
						Logger.info('got Focus event', event);
						_engine.player.active = true;
						Server.socket.emit('player_active_state', _engine.player.active);
					});
					_engine.cursorTile = _engine.makeTile(imageList['mark_tiles'], 0, 0);
					_engine.pathTile = _engine.makeTile(imageList['mark_tiles'], 38, 0);
					_engine.activeTile = _engine.makeTile(imageList['mark_tiles'], 76, 0);
					// setInterval(function() {
					// 	console.log(Engine.player.position.raw);
					// }, 1000);
					// Utils.attachEvent(document, 'beforeunload', function (event) {
					// 	event.preventDefault();
					// 	Logger.info('unload', event);
					// 	Server.disconnect('message text');
					// 	return 'fdsdfsdfsdgsdhs';
					// });
				});
			});
			
			// });
			

			this.renderCanvas.onRender(function (delta) {
				_engine.onRender(_engine.buffer, delta);
				//_engine.renderCanvas.drawImage(_engine.buffer.canvas, 0, 0);
			}).onStep(function (delta) {
				_engine.onStep(delta);
			}).onMouseUp(function (x, y) {
				Engine.onMouseUp(x, y);
			}).onMouseDown(function (x, y) {
				Engine.onMouseDown(x, y);
			}).onMouseMove(function (x, y) {
				Engine.onMouseMove(x, y);
			});
			Logger.info('Engine: ', this);
		


		},



		onStep: function (delta) {
			if(this.player) {
				this.player.onStep(delta);
				var pos = this.player.position;
				var pos = new Array(pos.x, pos.y);
				if(activeTilesList.exists(pos, true)) {
					this.label = activeTilesList[activeTilesList.exists(pos)][2];
					this.player.opacity = 0.5;
					//console.log('in place!');
				} else {
					this.label = '';
					this.player.opacity = 1;
				}
				// this.worldOffset.x -= 0.1; //Math.max(Math.min(pos.x - Engine.renderCanvas.canvas.width, 0), Engine.renderCanvas.canvas.width - Engine.Map.canvas.width);
				// this.worldOffset.y -= 0;//Math.max(Math.min(pos.y - Engine.renderCanvas.canvas.height, 0), Engine.renderCanvas.canvas.height - Engine.Map.canvas.height);
			}
			if(Object.keys(this.entitiesList).length > 0) {
				for(var key in this.entitiesList) this.entitiesList[key].onStep(delta);
			}
		},
		onMouseUp: function (x, y) {

			//this.mapMove = false;
			
			tmp = this.cursorPosition;
			this.player.setMoveTarget(tmp.x, tmp.y);
			console.log(tmp);
			console.log(this.getScreenCoordinates(tmp.x, tmp.y, true));
			//console.log();

		},

		onMouseDown: function (x, y) {
			
			// this.mapMove = true;
			
			this.mouseDownPos = { 
				x: x - this.worldOffset.x,
				y: y - this.worldOffset.y
			}
		},
		
		onMouseMove: function (x, y) {
			this.cursorPosition = this.getMapCoordinates(x, y);
			
			// if(this.mapMove) {
			// 	if(this.map.canvas.width)
			// 		this.worldOffset.x = Math.max(Math.min(x - this.mouseDownPos.x, 0), this.renderCanvas.canvas.width - this.map.canvas.width);
			// 		this.worldOffset.y = Math.max(Math.min(y - this.mouseDownPos.y, 0), this.renderCanvas.canvas.height - this.map.canvas.height);
			// }
		},
		
		//get tile iso position
		getMapCoordinates: function (x, y) {
			x = ((2 * (x - this.worldOffset.x) - Map.mapData.width * this.sprite.w) / this.sprite.w);
			y = (2 * (y - this.worldOffset.y)) / this.sprite.h ;
		
			var mx = Math.round((y + x) / 2) - 1;
			var my = Math.round((y - x) / 2);
			
			return {
				x: mx,
				y: my
			}
		},
		
		// get tile center offset
		getScreenCoordinates: function (x, y, raw) {
			var sx = this.worldOffset.x + ((x - y) * this.sprite.w/2 + this.sprite.w/2) + Map.mapData.width/2 * this.sprite.w;
			var sy = this.worldOffset.y + ((x + y) * this.sprite.h/2 + this.sprite.h/2);
			
			//var tw = (w - 2 * sqrt3)

			return {
				x: (raw) ? sx : sx | 0,
				y: (raw) ? sy : sy | 0
			}
		},

		addEntity: function (object) { 
			this.entitiesList[object.uid] = object; 
			Logger.info('Adding Entity: ' + object.name, object, this.entitiesList);
		},

		renderItems: function(ctx) {
			if(this.itemCanvas) {
				ctx.drawImage(this.itemCanvas.canvas, 0, 0);
				
			} else {
				console.log(activeTilesList);
				this.itemCanvas = cq(Map.canvas.width, Map.canvas.height);
				for (var i = 0; i < activeTilesList.length; i++) {
					var pos = this.getScreenCoordinates(activeTilesList[i][0], activeTilesList[i][1]);
					
					console.log(activeTilesList[i]);
					console.log(pos);
					this.itemCanvas.save()
						//.translate(, pos.y - (this.sprite.h)/2 )
						.drawImage(this.activeTile, pos.x - this.sprite.w/2, pos.y - (this.sprite.h)/2)
					.restore();
				}
				console.log(this.itemCanvas.canvas.toDataURL());
			}
		},

		renderEntities: function(ctx) {
			for(var key in this.entitiesList) {
				var object = this.entitiesList[key];
				object.render(ctx);
			}
			if(this.player) this.player.render(ctx);
		},

		renderCursorTile: function (ctx) {
			if (this.cursorPosition.x >= 0 &&
			 		this.cursorPosition.y >= 0 &&
			 		this.cursorPosition.x < Map.mapData.width &&
			 		this.cursorPosition.y < Map.mapData.height) {
				if (this.Map.mapData.data.accessible[this.cursorPosition.y][this.cursorPosition.x]) {
					var cursor = this.getScreenCoordinates(this.cursorPosition.x, this.cursorPosition.y);
					ctx.save()
						.translate(cursor.x - this.sprite.w/2, cursor.y - (this.sprite.h)/2 )
						.drawImage(this.cursorTile, 0, 0)
					.restore();
				}
			}
		},

		onRender: function (ctx, delta) {

			ctx.clear();
			
			ctx.fillStyle('#30363c').fillRect(0, 0, this.renderCanvas.canvas.width, this.renderCanvas.canvas.height);
			
			if(Utils.isPreloaderWorking) {
				
				ctx.save();
				ctx.translate(50, this.canvas.height / 2 - 20);
				ctx.fillStyle('#fff');
				ctx.fillRect(0, 0, Utils.preloaderProgress * this.canvas.width - 50, 40);
				ctx.restore();
			
			} else if(Map.isLoaded) {
			 	//this.drawGround(ctx);

			 	ctx.save();
				//this.renderCanvas.translate(this.worldOffset.x, this.worldOffset.y);
				
				ctx.drawImage(Map.canvas, this.worldOffset.x, this.worldOffset.y);
				if(this.pathCanvas) {
					ctx.drawImage(this.pathCanvas.canvas, this.worldOffset.x, this.worldOffset.y);
				}
				//this.renderPath(this.renderCanvas);
				//this.renderCanvas.save();
				//this.renderCanvas.translate(this.worldOffset.x, this.worldOffset.y);
				
				
				//this.renderCanvas.drawImage(ctx.canvas, this.worldOffset.x, this.worldOffset.y);//this.renderCanvas.restore();
				
				
				//this.render_test_cube(this.renderCanvas);
				//this.renderCanvas.drawImage(this.cursorPositionCanvas.canvas,  this.worldOffset.x, this.worldOffset.y);
				
				ctx.font("20pt Arial").fillStyle('#fff').fillText(delta, 20, 40);
				if(this.player) {
					this.renderItems(ctx);
				
					this.renderCursorTile(ctx);
				
					this.renderEntities(ctx);

					ctx.font("10pt Arial").fillText('[' + this.player.position.raw.x + ', ' + this.player.position.raw.y + ']', 20, 60);
					ctx.font("10pt Arial").fillText('progress: ' + this.player.moveProggres, 20, 80);
					ctx.font("16pt Arial").fillText(this.label, 20, window.innerHeight - 20);
				}
				ctx.restore();
				this.renderCanvas.drawImage(ctx.canvas, 0, 0);
			}
		},

		resize: function (event) {
			// Engine.scale = Math.min(window.innerWidth, window.innerHeight) / 10;
			// Engine.sprite = {
			// 	w: Math.sqrt(3) * Engine.scale,
			// 	h: Engine.scale
			// }
			// Map.refresh();
			// Engine.map = Map.draw(Engine.images.tiles);
			// Logger.info('cale', Engine.scale);
			Engine.renderCanvas.canvas.width = Engine.buffer.canvas.width = window.innerWidth;
			Engine.renderCanvas.canvas.height = Engine.buffer.canvas.height = window.innerHeight;
		}
	};
	
	Logger.info('-> ', Engine);
	Logger.groupEnd();
	
	return Engine;
});