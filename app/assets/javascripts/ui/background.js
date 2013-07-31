/*
	@file: background.js
	
	Copyright (c) 2013 Pawel Waleczek [pawel@thisismyasterisk.org], All rights reserved.

	THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF
	ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
	IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR
	PURPOSE.

	Please see the license.txt file for more information.
*/

define(['utils'], function() {
		var Background = function() {
			console.log('init!');

			this.offset = {
				x: 0,
				y: 0
			}

			this.lineWidth = 4;
			this.staticBuffer = cq(window.innerWidth * 2, window.innerHeight * 2);
			
			this.shape1 = new this.shapeCanvas('rgb(232, 23, 93)');
			this.shape2 = new this.shapeCanvas('rgb(238, 238, 238)');
			this.shape3 = new this.shapeCanvas('rgb(54, 54, 54)');

			for(var i = 0; i < (Math.random() * 10 + 6) | 0; i++) {

				this.staticBuffer.drawImage(this.shape1.cw.canvas, Math.random() * window.innerWidth, Math.random() * window.innerHeight);
				this.staticBuffer.drawImage(this.shape2.cw.canvas, Math.random() * window.innerWidth, Math.random() * window.innerHeight);
				this.staticBuffer.drawImage(this.shape3.cw.canvas, Math.random() * window.innerWidth, Math.random() * window.innerHeight);
			}

			// this.staticBuffer.strokeStyle('#eee').lineWidth(2);
			// for(var i = 0; i < window.innerHeight; i+= (Math.random() * 5) | 0) {
			// 	this.staticBuffer.beginPath()
			// 		.moveTo(Math.random() * window.innerWidth / 2, i)
			// 		.lineTo(Math.random() * window.innerWidth / 2 + window.innerWidth / 2, i)
			// 		.stroke()
			// 		.closePath();
			// }

			console.log(this);
			
			this.buffer = cq(window.innerWidth, window.innerHeight);
			
		}

		Background.prototype = {
			shapeCanvas: function(color) {
				var	SHAPE_W = 300,
						SHAPE_H = 300;

				this.cw = cq(SHAPE_W, SHAPE_H)
					.clear()
					.strokeStyle(color)
					.fillStyle(color)
					.lineWidth(this.linkeWidth)
					.lineJoin('round')
					.beginPath()
					.moveTo(Math.random() * SHAPE_W, Math.random() * SHAPE_H);
				for(var i = 0; i < (Math.random() * 20 + 3) | 0; i++){
					this.cw.lineTo(Math.random() * SHAPE_W, Math.random() * SHAPE_H);
				}
				this.cw.fill()
					.stroke();


				
				//return {cw: cw, offset: { x: 0, y: 0}};
			},

			loadColorScheme: function() {
				var page = UI.CurrentPage;

				UI.renderCanvas.shiftHsl(1, null, null);
			},

			getPixels: function(image) {
				// if(instanceof image !== 'Image') {
				// 	return flse;
				// }



				return this;
			},

			run: function() {
				this.renderCanvas = cq(document.getElementById('background'));
				this.renderCanvas.canvas.width = this.buffer.width = window.innerWidth;
				this.renderCanvas.canvas.height = this.buffer.height = window.innerHeight;
				
				var _this = this;
				if(!UI.isHandheld) {
				
					this.renderCanvas.onRender(function (delta) {
						_this.render(_this.buffer, delta);
					}).onStep(function (delta) {
						_this.step();
					});
				}
				$(window).on('resize', this.resize);
				//$('canvas#background').fadeIn(UI.speed);
				
				this.moveDirectionChangeInterval = setInterval(function() {
					_this.moveDirection = Math.random();
				}, 3000);
				_this.moveDirection = Math.random();
			},

			step: function() {
				if(this.moveDirection < 0.25) {
					this.offset.x += Math.random() * 0.01;
					this.offset.y += Math.random() * 0.02;
				} else if(this.moveDirection < 0.5 && this.moveDirection > 0.25) {
					this.offset.x -= Math.random() * 0.02;
					this.offset.y -= Math.random() * 0.01;
				} else if(this.moveDirection < 0.75 && this.moveDirection > 0.5) {
					this.offset.x += Math.random() * 0.02;
					this.offset.y -= Math.random() * 0.01;
				} else if(this.moveDirection < 1 && this.moveDirection > 0.75) {
					this.offset.x -= Math.random() * 0.01;
					this.offset.y += Math.random() * 0.02;
				}
				if(this.offset.x > window.innerWidth * 2/3)
					this.offset.x = 0;

				if (this.offset.y > window.innerHeight * 2/3)
					this.offset.y = 0;
			},

			render: function(ctx, delta) {
				
				// this.staticBuffer.drawImage(this.shape1.cw.canvas, Math.random() * window.innerWidth, Math.random() * window.innerHeight);
				// this.staticBuffer.drawImage(this.shape2.cw.canvas, Math.random() * window.innerWidth, Math.random() * window.innerHeight);
				// this.staticBuffer.drawImage(this.shape3.cw.canvas, Math.random() * window.innerWidth, Math.random() * window.innerHeight);

				ctx.drawImage(this.staticBuffer.canvas, this.offset.x, this.offset.y);
				this.renderCanvas.drawImage(ctx.canvas, 0, 0);
			},
			resize: function (event) {
				// if(window.innerHeight < 200 && !$('body').hasClass('bad')) {
				// 	UI.Controllers.Bad.render('!!!', 'you mad? noone does that.');
				// } 
				UI.Background.renderCanvas.canvas.width = UI.Background.buffer.canvas.width = window.innerWidth;
				UI.Background.renderCanvas.canvas.height = UI.Background.buffer.canvas.height = window.innerHeight;
			}
		}

	return Background;

});