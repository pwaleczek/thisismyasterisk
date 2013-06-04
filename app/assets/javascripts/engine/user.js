define([
	'Logger',
	'Utils',
	'engine/server',
	'engine/sprite'
], function (Logger, Utils, Server, Sprite) {
	Logger.group('Loading User...');
	//Logger.info('Engine: ', window.App.Engine)
	var sqrt3 = Utils.sqrt3;
	var sqrt3h = sqrt3/2;
	
	var User = function (userName, userId, spawnPosition, userColor) {
		//console.log(userName);
		this.opacty = 1;
		this.a = 0;
		this.movePath = []
		this.active = true;
		this.name = userName;
		this.position = this.moveTarget = {
			x: spawnPosition.x,
			y: spawnPosition.y,
			raw: Engine.getScreenCoordinates(spawnPosition.x, spawnPosition.y)
		};
		//this.speed = 2; //pixel/refresh
		this.color = userColor;
		//console.log('color = ' + this.color);
		//this.sprite = cq(30, 30).drawImage(Engine.images.ball, 0, 0).blend(this.color, 'color', (userName !== 'player') ? 0.5 : 0.9);
		this.movingDirection = 0;
		this.uid = userId;
		this.moving = false;
		//this.generateSprites(this.color);
		this.spriteList = new Sprite('player', Engine.images['cube'], 74, 68);
		if(userName !== 'player') Engine.addEntity(this);
		this.sprite = {
			w: 74,
			h: 68
		}
		//console.log(this);
		return this;
	};

	User.prototype = {	

		setMoveTarget: function (x, y, remote) {
			remote = remote || false;
			Logger.info('setting move target to: ' + x + ', ' + y);
			if(remote || this.checkTileAvailability()) {

				this.moveTarget = Engine.getScreenCoordinates(x, y);
				this.movePath = Utils.aStar.searchPath({x:this.position.x, y:this.position.y}, {x:x, y:y}, Engine.Map.mapData.data.accessible);
				console.log(this.movePath);
				Engine.pathCanvas = cq(Engine.Map.mapData.width * Engine.Map.tw + Engine.Map.tw/2, Engine.Map.mapData.height * 2*Engine.Map.th);
				for(var p = 0; p < this.movePath.length; p++) {
					var pos = Engine.getScreenCoordinates(this.movePath[p].x, this.movePath[p].y);
					Engine.pathCanvas.drawImage(Engine.pathTile, pos.x - Engine.worldOffset.x - Engine.sprite.w/2, pos.y - Engine.worldOffset.y - Engine.sprite.h/2);
				}
				this.moveProggres = 0;
				// this.position.x = this.movePath[this.moveProggres].x;
				// this.position.y = this.movePath[this.moveProggres].y;
				// this.position.raw = Engine.getScreenCoordinates(this.position.x, this.position.y);
				var xDir = (this.movePath[this.moveProggres].x < this.movePath[this.moveProggres+1].x) ? '' : '-';
				var yDir = (this.movePath[this.moveProggres].y < this.movePath[this.moveProggres+1].y) ? '' : '-';

				this.movingDirection = (this.movePath[this.moveProggres].x != this.movePath[this.moveProggres+1].x) ? xDir + 'x' : yDir + 'y';
				Server.socket.emit('update_player', {uid: this.uid, target: this.movePath[this.movePath.length - 1] });
				
				this.moving = true;
			
			}
		},
		
		checkTileAvailability: function() {
			if (Engine.cursorPosition.x >= 0 &&
		 		Engine.cursorPosition.y >= 0 &&
		 		Engine.cursorPosition.x < Engine.Map.mapData.width &&
		 		Engine.cursorPosition.y < Engine.Map.mapData.height &&
		 		(Engine.Map.mapData.data.accessible[Engine.cursorPosition.y][Engine.cursorPosition.x])) {
		 			return true;
			}
			return false;
		},

		getPosition: function () {
			return { x: this.position.x, y: this.position.y }
		},

		render: function (ctx, delta, time) {
			var pos = this.position.raw;
			if(this.moving) {
				var x,
						y;

				switch(this.movingDirection) {
					case 'x':
						x = 3
					break;
					case '-x':
						x=2;
					break;
					case 'y':
						x=0;
					break;
					case '-y':
						x=1;
					break;
				}
				this.a+=0.5;
				ctx.globalAlpha(this.opacity).drawImage(this.spriteList[x][Math.floor(this.a)], pos.x - this.sprite.w/2, pos.y - this.sprite.h/2 - Engine.sprite.d -4);


				if(this.a >= 9) {
					this.a = 0;
					this.moveProggres++;
					if(this.moveProggres == this.movePath.length - 1) {
						this.moving = false;
						Engine.pathCanvas.clear();
						//delete this.moveProggres;
						//this.position.raw = Engine.getScreenCoordinates(this.position.x, this.position.y);
						console.log('stop moving ' + this.moveProggres);
					}
					this.position.x = this.movePath[this.moveProggres].x;
					this.position.y = this.movePath[this.moveProggres].y;
					this.position.raw = Engine.getScreenCoordinates(this.position.x, this.position.y);
					if(this.moving) {
						var xDir = (this.movePath[this.moveProggres].x < this.movePath[this.moveProggres+1].x) ? '' : '-';
						var yDir = (this.movePath[this.moveProggres].y < this.movePath[this.moveProggres+1].y) ? '' : '-';

						this.movingDirection = (this.movePath[this.moveProggres].x != this.movePath[this.moveProggres+1].x) ? xDir + 'x' : yDir + 'y';
						console.log(this.moveProggres + '/' + (this.movePath.length - 1) + ' ' + this.movingDirection + '  ' + this.position.x + ';' + this.position.y);

					}
					// Server.socket.emit('update_player', {
		 		// 		uid: Engine.player.uid, 
		 		// 		position: this.position.raw
		 		// 	});

				}	
								
			} else {
				ctx.globalAlpha(this.opacity).drawImage(this.spriteList[0][0], pos.x - this.sprite.w/2, pos.y - this.sprite.h/2 - Engine.sprite.d-4);
			}
			ctx.globalAlpha(1);
		},

		onMove: function (x, y) {
			
			xDir = (x > this.position.raw.x) ? 1 : -1;  // positive increment if destination is greater than current location
 			yDir = (y > this.position.raw.y) ? 1 : -1;
 			
 			this.position.raw.x += Math.floor(xDir * (sqrt3/Engine.scale/100));
 			this.position.raw.y += Math.floor(yDir * (Engine.scale/100));
			//this.position.raw.x = Engine.worldOffset.x;
 			//this.position.raw.y = Engine.worldOffset.y;
 			//console.log(this.position.raw);
 			Server.socket.emit('update_player', {
 				uid: Engine.player.uid, 
 				position: this.position.raw
 			});
		},

		onStep: function (delta) {
			
			 
			if(this.moveProggres+1 < this.movePath.length) {
				// var xDir = (this.movePath[this.moveProggres+1].x < this.movePath[this.moveProggres+2].x) ? '' : '-';
				// var yDir = (this.movePath[this.moveProggres+1].y < this.movePath[this.moveProggres+2].y) ? '' : '-';

				// this.movingDirection = (this.movePath[this.moveProggres+1].x != this.movePath[this.moveProggres+2].x) ? xDir + 'x' : yDir + 'y';

				// //var pos = Engine.getScreenCoordinates(this.movePath[this.moveProggres+1].x, this.movePath[this.moveProggres+1].y);
				
				// if(this.moveProggres == this.movePath.length - 1 && this.moving) {
				// 		delete this.moveProggres;
				// 		this.moving = false;
				// 		//this.position.raw = Engine.getScreenCoordinates(this.position.x, this.position.y);
				// 		console.log('stop moving' + this.moveProggres);
				// 	}
				// //while(this.moveProggres < this.movePath.length)
				// //this.onMove(pos.x, pos.y);
				// //Logger.info(this.moveTarget, this.position, Engine.getMapCoordinates(this.moveTarget.x, this.moveTarget.y));
				// if(Utils.pointCompare(this.position, this.movePath[this.movePath.length - 1], 'int')) {
				// 	//console.log(this.moveProggres + ': got to point [' + this.movePath[this.moveProggres].x + ', ' + this.movePath[this.moveProggres].y + ']');
				// 	//this.moveProggres++;
				// 	// this.position.x = this.movePath[this.moveProggres+1].x;
				// 	// this.position.y = this.movePath[this.moveProggres+1].y;
				// 	// this.position.raw = Engine.getScreenCoordinates(this.position.x, this.position.y);
				// 	if(this.movePath.length > 0) {
				// 		Engine.pathCanvas.clear()	
				// 		for(var p = this.moveProggres; p < this.movePath.length; p++) {
				// 			var pos = Engine.getScreenCoordinates(this.movePath[p].x, this.movePath[p].y);
				// 			Engine.pathCanvas.drawImage(Engine.pathTile, pos.x - Engine.worldOffset.x - Engine.sprite.w/2, pos.y - Engine.worldOffset.y - Engine.sprite.h/2);
				// 		}
				// 	}

					
				// }
			}
		}
	}

	Logger.info('-> ', User);
	Logger.groupEnd();
	return User;
});