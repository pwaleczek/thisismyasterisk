/*
	@file: user.js
	
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
		this.animationStep = 0;
		this.movePath = []
		this.active = true;
		this.name = userName;
		this.position = this.moveTarget = {
			x: spawnPosition.x,
			y: spawnPosition.y,
			raw: Engine.getScreenCoordinates(spawnPosition.x, spawnPosition.y)
		};
		this.speed = 70;
		this.color = userColor;
		this.movingDirection = 0;
		this.uid = userId;
		this.moving = false;

		this.sprite = {
			w: 74,
			h: 68
		}

		this.spriteList = new Sprite('player', Engine.images['cube'], this.sprite.w, this.sprite.h);

		if(userName !== 'player') Engine.addEntity(this);
		
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

				this.moveProggres = 0;
				
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

		render: function (ctx, delta, time) {
			var pos = this.position.raw;
			if(this.moving) {
				var direction;
				switch(this.movingDirection) {
					case 'x':
						direction = 3;
					break;
					case '-x':
						direction = 2;
					break;
					case 'y':
						direction = 0;
					break;
					case '-y':
						direction = 1;
					break;
				}
				ctx.globalAlpha(this.opacity).drawImage(this.spriteList[direction][Math.floor(this.animationStep)], pos.x - this.sprite.w/2, pos.y - this.sprite.h/2 - Engine.sprite.d - 4);		
			} else {
				ctx.globalAlpha(this.opacity).drawImage(this.spriteList[0][0], pos.x - this.sprite.w/2, pos.y - this.sprite.h/2 - Engine.sprite.d - 4);
			}
			ctx.globalAlpha(1);
		},

		onStep: function (delta) {
			
			if(this.moving) {	
				this.animationStep += 0.5 * this.speed * delta/1000;
				if(this.animationStep >= 9) {
					this.animationStep = 0;
					this.moveProggres++;
					if(this.moveProggres == this.movePath.length - 1) {
						this.moving = false;
						console.log('stop moving ' + this.moveProggres);
						
					} else {
						var xDir = (this.movePath[this.moveProggres].x < this.movePath[this.moveProggres+1].x) ? '' : '-';
						var yDir = (this.movePath[this.moveProggres].y < this.movePath[this.moveProggres+1].y) ? '' : '-';
						this.movingDirection = (this.movePath[this.moveProggres].x != this.movePath[this.moveProggres+1].x) ? xDir + 'x' : yDir + 'y';
					}
					this.position.x = this.movePath[this.moveProggres].x;
					this.position.y = this.movePath[this.moveProggres].y;
					this.position.raw = Engine.getScreenCoordinates(this.position.x, this.position.y);

					console.log(this.moveProggres + '/' + (this.movePath.length - 1) + ' ' + this.movingDirection + '  ' + this.position.x + ';' + this.position.y);
				}
			} 

			this.opacity = (!this.active && !this.moving) ? 0.2 : 1;
		}
	}

	Logger.info('-> ', User);
	Logger.groupEnd();
	return User;
});