define([
	'Logger',
	'Utils',
	'engine/server'
], function (Logger, Utils, Server) {
	Logger.group('Loading User...');
	//Logger.info('Engine: ', window.App.Engine)
	var sqrt3 = Utils.sqrt3;
	var sqrt3h = sqrt3/2;
	var a = 0;
	var User = function (userName, userId, spawnPosition, userColor) {
		//console.log(userName);
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
		this.generateSprites(this.color);
		if(userName !== 'player') Engine.addEntity(this);
		//console.log(this);
		return this;
	};

	User.prototype = {	
		generateSprites: function (color) {
			var scale = Engine.scale;
			var size = Engine.sprite;
			var sprites = [];
			var steps = 20;
			var spriteCanvas = cq(3 * (steps - 1) * size.w, 16 * size.h);

			for(var a = 0; a < steps; a++) {
				var t = a / steps;
				
				var _p1;
				if(t <= 0.5) {
					var _t = t*2;
					_p1 = Utils.bezierPosition(_t, [
						[0, 0.5],
						[sqrt3 / 6, 0.25],
						[sqrt3h, 11/16]
					]);
				} else {
					var _t = (t-0.5)*2;
					_p1 = Utils.bezierPosition(_t, [
						[sqrt3h, 11/16],
						[5 * sqrt3 / 6, 15/16],
						[sqrt3, 1.5]
					]);
				}
				
				var _p2 = Utils.bezierPosition(t, [
					[0, 1.5],
					[0, 9/16],
					[sqrt3h, 1]
				]);
				
				var _p3 = Utils.bezierPosition(t, [
					[sqrt3h, 1],
					[sqrt3, 26/16],
					[sqrt3, 2.5]
				]);
				//Logger.info(_p1, _p2, _p3);
				var tcw = cq(3 * size.w, 4 * size.h);
				tcw.save()
					// .strokeRect(0, 0, 3 * size.w, 4 * size.h)
					.strokeStyle(color)
					.lineWidth((scale/8) | 0)
					.lineCap('round')
					.lineJoin('round')
					.translate(size.w, size.h)
					.beginPath()
					
					.moveTo((_p1.x * scale) | 0, ((_p1.y) * scale) | 0)
					.lineTo((_p2.x * scale) | 0, (_p2.y * scale) | 0)
					.lineTo((sqrt3h * scale) | 0, (2 * scale) | 0)
					.lineTo((_p3.x * scale) | 0, (_p3.y * scale) | 0)
					.closePath()
					
					.moveTo((_p1.x * scale) | 0, ((_p1.y) * scale) | 0)
					.lineTo(((_p1.x + sqrt3h) * scale), ((_p1.y - 0.5) * scale) | 0)

					.moveTo(((_p3.x) * scale) | 0, (_p3.y * scale) | 0)
					.lineTo(((_p3.x + sqrt3h) * scale) | 0, ((_p3.y - 0.5) * scale) | 0);
					
					if(t<0.5) {
						tcw.moveTo((sqrt3h * scale) | 0, (2 * scale) | 0);
						tcw.lineTo((sqrt3 * scale) | 0, (1.5 * scale) | 0);
					}
					  tcw.moveTo(((_p1.x + sqrt3h) * scale), ((_p1.y - 0.5) * scale) | 0)
					  .lineTo(((_p3.x + sqrt3h) * scale) | 0, ((_p3.y - 0.5) * scale) | 0);
					  if(t<0.5) tcw.lineTo((sqrt3 * scale) | 0, (1.5 * scale) | 0);
					
					if(t>0.45) {
						tcw.moveTo((_p2.x * scale) | 0, (_p2.y * scale) | 0)
						.lineTo(((_p2.x + sqrt3h) * scale) | 0, ((_p2.y - 0.5)  * scale) | 0)
						.lineTo(((_p1.x + sqrt3h) * scale), ((_p1.y - 0.5) * scale) | 0)
					}
					tcw.stroke()
				.restore();
				rcw = cq(3 * size.w, 6 * size.h);
				rcw.translate(3 * size.w, 0);
				rcw.scale(-1, 1);
				rcw.drawImage(tcw.canvas, 0, 0);
				
				//console.log(rcw.canvas.toDataURL());
				spriteCanvas.drawImage(tcw.canvas, a * 3 * size.w, 0);
				spriteCanvas.drawImage(rcw.canvas, a * 3 * size.w, 4 * size.h);
			}



			for(var a = 0; a < steps; a++) {
				var t = a / steps;
				
				var _p1;
				if(t <= 0.5) {
					var _t = t*2;
					_p1 = Utils.bezierPosition(_t, [
						[sqrt3h, 1],
						[sqrt3h / 3, 7/16],
						[0, 3/32]
					]);
				} else {
					var _t = (t-0.5)*2;
					_p1 = Utils.bezierPosition(_t, [
						[0, 3/32],
						[-2 * sqrt3h / 3, -0.25],
						[-sqrt3h, 0]
					]);
				}
				
				var _p2 = Utils.bezierPosition(t, [
					[0, 0.5],
					[-sqrt3h, 1/16],
					[-sqrt3h, 1]
				]);
				
				var _p3 = Utils.bezierPosition(t, [
					[sqrt3h, 2],
					[sqrt3h, 17/16],
					[0, 0.5]
				]);

				var tcw = cq(3 * size.w, 4 * size.h);
				tcw.save()
					// .strokeRect(0, 0, 3 * size.w, 4 * size.h)
					.strokeStyle(color)
					.lineWidth((scale/8) | 0)
					.lineCap('round')
					.lineJoin('round')
					.translate(size.w, size.h)
					.beginPath()
					
					.moveTo((_p2.x * scale) | 0, (_p2.y * scale) | 0)
					.lineTo(0, (1.5 * scale) | 0)
					.lineTo((_p3.x * scale) | 0, (_p3.y * scale) | 0)
					.lineTo((_p1.x * scale) | 0, (_p1.y * scale) | 0)
					.closePath()
					
					.moveTo((_p1.x * scale) | 0, (_p1.y * scale) | 0)
					.lineTo(((_p1.x + sqrt3h) * scale), ((_p1.y - 0.5) * scale) | 0)

					.moveTo(((_p3.x) * scale) | 0, (_p3.y * scale) | 0)
					.lineTo(((_p3.x + sqrt3h) * scale) | 0, ((_p3.y - 0.5) * scale) | 0);
					
					
					tcw.moveTo(0, (1.5 * scale) | 0);
					tcw.lineTo((sqrt3 * scale) | 0, (1.5 * scale) | 0);
					
					tcw.moveTo(((_p1.x + sqrt3h) * scale), ((_p1.y - 0.5) * scale) | 0)
						.lineTo(((_p3.x + sqrt3h) * scale) | 0, ((_p3.y - 0.5) * scale) | 0);
						if(t<0.5) tcw.lineTo((sqrt3 * scale) | 0, (1.5 * scale) | 0);
					
					// tcw.moveTo(0, (1.5 * scale) | 0)
					// 	.lineTo((_p2.x * scale) | 0, (_p2.y * scale) | 0);

					if(t>0.45) {
						tcw.moveTo(0, (1.5 * scale) | 0)
						.lineTo(((_p2.x + sqrt3h) * scale) | 0, ((_p2.y - 0.5)  * scale) | 0)
						.lineTo(((_p1.x + sqrt3h) * scale), ((_p1.y - 0.5) * scale) | 0)
					}
					tcw.stroke()
				.restore();
				rcw = cq(3 * size.w, 6 * size.h);
				rcw.translate(3 * size.w, 0);
				rcw.scale(-1, 1);
				rcw.drawImage(tcw.canvas, 0, 0);
				
				//console.log(rcw.canvas.toDataURL());
				spriteCanvas.drawImage(tcw.canvas, a * 3 * size.w, 8 * size.h);
				spriteCanvas.drawImage(rcw.canvas, a * 3 * size.w, 12 * size.h);
			}
			console.log(spriteCanvas.canvas.toDataURL());

			this.spriteImage = spriteCanvas;
			//console.log(this.spriteImage);
		},
		setMoveTarget: function (x, y, remote) {
			remote = remote || false;
			Logger.info('setting move target to: ' + x + ', ' + y);
			if(remote || this.checkTileAvailability()) {

				this.moveTarget = Engine.getScreenCoordinates(x, y);
				this.movePath = Utils.aStar.searchPath({x:this.position.x, y:this.position.y}, {x:x, y:y}, Engine.Map.mapData.data);
				Engine.pathCanvas = cq(Engine.Map.mapData.width * Engine.Map.tw + Engine.Map.tw/2, Engine.Map.mapData.height * 2*Engine.Map.th);
				for(var p = 0; p < this.movePath.length; p++) {
					var pos = Engine.getScreenCoordinates(this.movePath[p].x, this.movePath[p].y);
					Engine.pathCanvas.drawImage(Engine.pathTile, pos.x - Engine.worldOffset.x - Engine.sprite.w/2, pos.y - Engine.worldOffset.y - Engine.sprite.h/2);
				}
				this.moveProggres = 1;
				// this.position.x = this.movePath[this.moveProggres].x;
				// this.position.y = this.movePath[this.moveProggres].y;
				// this.position.raw = Engine.getScreenCoordinates(this.position.x, this.position.y);
				var xDir = (this.movePath[this.moveProggres].x < this.movePath[this.moveProggres+1].x) ? '' : '-';
				var yDir = (this.movePath[this.moveProggres].y < this.movePath[this.moveProggres+1].y) ? '' : '-';

				this.movingDirection = (this.movePath[this.moveProggres].x != this.movePath[this.moveProggres+1].x) ? xDir + 'x' : yDir + 'y';
				Server.socket.emit('update_player', {uid: this.uid, target: this.movePath[this.movePath.length - 1] });
				console.log(this.movePath);
				this.moving = true;
			
			}
		},
		
		checkTileAvailability: function() {
			if (Engine.cursorPosition.x >= 0 &&
		 		Engine.cursorPosition.y >= 0 &&
		 		Engine.cursorPosition.x < Engine.Map.mapData.width &&
		 		Engine.cursorPosition.y < Engine.Map.mapData.height &&
		 		(!Engine.Map.mapData.data[Engine.cursorPosition.x][Engine.cursorPosition.y])) {
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
				var x = 3 * a * Engine.sprite.w,
						y;

				switch(this.movingDirection) {
					case 'x':
						y = 0
					break;
					case '-x':
						y = 8 * Engine.sprite.h;
					break;
					case 'y':
						y = 4 * Engine.sprite.h;
					break;
					case '-y':
						y = 12 * Engine.sprite.h;
					break;
				}
				a++;
				ctx.drawImage(this.spriteImage.canvas, x, y, 3 * Engine.sprite.w, 4 * Engine.sprite.h, pos.x - 1.5*Engine.sprite.w, pos.y - 2.5*Engine.sprite.h, 3 * Engine.sprite.w, 4 * Engine.sprite.h);
				if(a >= 19) {
					a = 0;
					if(this.moveProggres == this.movePath.length - 1) {
						this.moving = false;
						//delete this.moveProggres;
						//this.position.raw = Engine.getScreenCoordinates(this.position.x, this.position.y);
						console.log('stop moving' + this.moveProggres);
					}
					this.position.x = this.movePath[this.moveProggres].x;
					this.position.y = this.movePath[this.moveProggres].y;
					this.position.raw = Engine.getScreenCoordinates(this.position.x, this.position.y);
					var xDir = (this.movePath[this.moveProggres].x < this.movePath[this.moveProggres+1].x) ? '' : '-';
					var yDir = (this.movePath[this.moveProggres].y < this.movePath[this.moveProggres+1].y) ? '' : '-';

					this.movingDirection = (this.movePath[this.moveProggres].x != this.movePath[this.moveProggres+1].x) ? xDir + 'x' : yDir + 'y';
					
					// Server.socket.emit('update_player', {
		 		// 		uid: Engine.player.uid, 
		 		// 		position: this.position.raw
		 		// 	});

					this.moveProggres++;
					
					console.log(this.moveProggres + '/' + this.movePath.length + ' ' + this.movingDirection + '  ' + this.position.x + ';' + this.position.y);
				}
			} else {
				ctx.drawImage(this.spriteImage.canvas, 0, 0, 3 * Engine.sprite.w, 4 * Engine.sprite.h, pos.x - 1.5*Engine.sprite.w, pos.y - 2.5*Engine.sprite.h, 3 * Engine.sprite.w, 4 * Engine.sprite.h);
			}
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