/*
	@file: ui.js
	
	Copyright (c) 2013 Pawel Waleczek [pawel@thisismyasterisk.org], All rights reserved.

	THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF
	ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
	IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR
	PURPOSE.

	Please see the license.txt file for more information.
*/

define([
	'underscore',
	'utils',
	'ui/router',
	// models and collections
	'ui/collections/timber',
	'ui/collections/lab',

	// controllers
	'ui/controllers/index',
	'ui/controllers/timber',
	'ui/controllers/log',
	'ui/controllers/bad',
	'ui/controllers/about',
	'ui/controllers/work',
	'ui/controllers/asterisk',
	'ui/controllers/lab',
	'ui/controllers/lab_elem',
	'ui/controllers/cookie_note'

], function (_, Utils, router, timberCollection, labCollection, index, timber, log, bad, about, work, asterisk, lab, labElem, cookieNote) {
	console.log('Loadeing UI...');
	window.UI = {
		
		speed: 200, // transitions base speed
		isRunning: false,

		cookiesPolicyAccepted: parseInt(localStorage['cookiesPolicyAccepted']),

		isMobile: /Android|webOS|iPad/i.test(navigator.userAgent),
		isHandheld: /Mobile|Phone|iPod|BlackBerry/i.test(navigator.userAgent),
		
		fetchTimberCount: 0,
		fetchTimberInProgress: 0,

		fetchLabCount: 0,
		fetchLabInProgress: 0,

		Links: {
			GitHubIssues: 'http://github.com/pwaleczek/thisismyasterisk/issues',
			GitHub: 'http://github.com/pwaleczek',
			LinkedIn: 'http://pl.linkedin.com/pub/pawe%C5%82-waleczek/53/316/533',
			facebook: 'http://facebook.com/pawel.waleczek'
		},
		
		Collections: {},
		Controllers: {},
		
		Router: {},
		
		initialize: function() {
			console.log('starting ui init. cookies %s', localStorage['cookiesPolicyAccepted']);
			console.log('mobile: %s, handheld: %s', this.isMobile, this.isHandheld);
			console.log(navigator.userAgent);
			this.Router = new router;
			
			// Collections
			this.Collections = {
				Timber: new timberCollection,
				Lab: new labCollection
			};
			
			// Controllers
			this.Controllers = {
				Index: new index,
				Timber: new timber({collection: this.Collections.Timber}),
				About: new about,
				Bad: new bad,
				Lab: new lab({collection: this.Collections.Lab}),
				Work: new work,
				Asterisk: new asterisk,
				Log: log,
				LabElem: labElem,
				CookieNote: new cookieNote
			};
		},
		
		Background: {
			makeShapesCanvas: function(color) {
				var	SHAPE_W = 300,
						SHAPE_H = 300;

				var cw = cq(SHAPE_W, SHAPE_H)
					.clear()
					.strokeStyle(color)
					.fillStyle(color)
					.lineWidth(this.linkeWidth)
					.lineJoin('round')
					.beginPath()
					.moveTo(Math.random() * SHAPE_W, Math.random() * SHAPE_H);
				for(var i = 0; i < (Math.random() * 20 + 3) | 0; i++){
					cw.lineTo(Math.random() * SHAPE_W, Math.random() * SHAPE_H);
				}
				cw.fill()
					.stroke();

				return cw;
			},

			initialize: function() {
				console.log('init!');

	
				this.lineWidth = 4;
				this.offset = {
					x: 0,
					y: 0
				}
				this.staticBuffer = cq(window.innerWidth * 2, window.innerHeight * 2);
				
				this.shape1Canvas = this.makeShapesCanvas('rgb(232, 23, 93)');
				this.shape2Canvas = this.makeShapesCanvas('rgb(238, 238, 238)');

				for(var i = 0; i < (Math.random() * 10 + 6) | 0; i++) {

					this.staticBuffer.drawImage(this.shape1Canvas.canvas, Math.random() * window.innerWidth, Math.random() * window.innerHeight);
					this.staticBuffer.drawImage(this.shape2Canvas.canvas, Math.random() * window.innerWidth, Math.random() * window.innerHeight);
				}

				// this.staticBuffer.strokeStyle('#eee').lineWidth(2);
				// for(var i = 0; i < window.innerHeight; i+= (Math.random() * 5) | 0) {
				// 	this.staticBuffer.beginPath()
				// 		.moveTo(Math.random() * window.innerWidth / 2, i)
				// 		.lineTo(Math.random() * window.innerWidth / 2 + window.innerWidth / 2, i)
				// 		.stroke()
				// 		.closePath();
				// }


				this.buffer = cq(window.innerWidth, window.innerHeight);
				this.renderCanvas = cq(document.getElementById('background'));
				this.renderCanvas.canvas.width = this.buffer.width = window.innerWidth;
				this.renderCanvas.canvas.height = this.buffer.height = window.innerHeight;

				var _this = this;
				console.log(_this);
				if(!UI.isHandheld) {
				console.log('run!');	
					this.renderCanvas.onRender(function (delta) {
						_this.render(_this.buffer, delta);
					}).onStep(function (delta) {
						_this.step();
					});
				}
				$(window).on('resize', this.resize);
				$('canvas#background').fadeIn(UI.speed);
				
				this.moveDirectionChangeInterval = setInterval(function() {
					_this.moveDirection = Math.random();
				}, 3000);
			},

			getPixels: function(image) {
				// if(instanceof image !== 'Image') {
				// 	return flse;
				// }



				return this;
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
			},

			render: function(ctx, delta) {
				ctx.clear();
				ctx.drawImage(this.staticBuffer.canvas, this.offset.x, this.offset.y);
				this.renderCanvas.drawImage(ctx.canvas, 0, 0);
			},
			resize: function (event) {
				UI.Background.renderCanvas.canvas.width = UI.Background.buffer.canvas.width = window.innerWidth;
				UI.Background.renderCanvas.canvas.height = UI.Background.buffer.canvas.height = window.innerHeight;
			}
		}
	}

	console.log('										...loaded.');

});