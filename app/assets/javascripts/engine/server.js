/*
	@file: server.js
	
	Copyright (c) 2013 Pawel Waleczek [pawel@thisismyasterisk.org], All rights reserved.

	THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF
	ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
	IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR
	PURPOSE.

	Please see the license.txt file for more information.
*/

define(function () {
	console.log('Loading Server module for Engine...');

	var Server = {
		name: 'Server',

		serviceURL: (env == 'production') ? 'http://service.thisismyasterisk.org:80' : 'http://localhost:4000', 

		initialize: function(callback) {
			console.log('server init...');
			// $.getScript(this.serviceURL + '/socket.io/socket.io.js')
			// 	.done(function(script, textStatus) {
			// 	  console.log('loaded %s', textStatus );
			// 	  callback();
			// 	})
			// 	.fail(function(jqxhr, settings, exception) {
			// 	  console.log('not loaded %s', exception);
			// 	});
			
			var head = document.getElementsByTagName('head')[0],		   		
				script = document.createElement('script');

			script.type = 'text/javascript';
			script.onerror = function() {
				//throw new Error('can\'t find '+arr[iter]);
				console.log('failed to load script');
			}
			script.onload = script.onreadystatechange = function() {
				callback();
			}
			script.src = this.serviceURL + '/socket.io/socket.io.js';
			head.appendChild(script);
		},

		resetUsersList: function() {
			this.socket.emit('reset_userlist', {});
		},

		connect: function (callback) {
			var _server = this;
			this.socket = io.connect(this.serviceURL);
			
			this.socket.on('connect', function () {
				var player = { 
					uid: localStorage.getItem('asterisk.player.UID'),
					color: localStorage.getItem('asterisk.player.color') || '#'+((1<<24)*Math.random()|0).toString(16),
					position: JSON.parse(localStorage.getItem('asterisk.player.position')) || { x: 0, y: 26 }
				}
				console.log(player);
				_server.socket.emit('player_data', player);
				console.log('onConnect');
			});

			this.socket.on('player_join', function (data) {
				callback(data.playerUID, data.users);	

			});

			this.socket.on('remove_user', function(data){
				console.log('removing user: ' + data);
				delete Engine.entitiesList[data];
			});

			this.socket.on('new_user_join', function (data) {
					new Engine.User('user', data.uid, data.position, data.color);
			});
			
			this.socket.on('update_user', function (data){
				console.log('User target: ' + data.target.x + ', ' + data.target.y);
				Engine.entitiesList[data.uid].setMoveTarget(data.target.x, data.target.y, true);
				//Engine.entitiesList[data.uid].position.raw = data.position;
			});

			this.socket.on('player_active_state', function (data) {
				Engine.entitiesList[data.uid].active = data.active;
				console.log(data.uid + ' ' + data.active);
			});

		},
		disconnect: function (message) {
			this.socket.emit('remove_user', {uid: Engine.player.uid, message: message});
		}

	};
	console.log('										...loaded.');

	return Server;
});