/*
	@file: server.js
	
	Copyright (c) 2013 Pawel Waleczek [pawel@thisismyasterisk.org], All rights reserved.

	THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF
	ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
	IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR
	PURPOSE.

	Please see the license.txt file for more information.
*/

define([
	'logger',
], function (Logger) {
	Logger.group('Loading Server...');

	var Server = {
		name: 'Server',

		resetUsersList: function() {
			this.socket.emit('reset_userlist', {});
		},

		connect: function (callback) {
			var _server = this;
			this.socket = io.connect((env == 'production') ? 'http://service.thisismyasterisk.org:80' : 'http://localhost:4000');
			
			this.socket.on('connect', function () {
				var player = { 
					uid: localStorage.getItem('asterisk.player.UID'),
					color: localStorage.getItem('asterisk.player.color') || '#'+((1<<24)*Math.random()|0).toString(16),
					position: JSON.parse(localStorage.getItem('asterisk.player.position')) || { x: 0, y: 26 }
				}
				Logger.info(player);
				_server.socket.emit('player_data', player);
				Logger.info('onConnect');
			});

			this.socket.on('player_join', function (data) {
				callback(data.playerUID, data.users);	

			});

			this.socket.on('remove_user', function(data){
				Logger.info('removing user: ', data);
				delete Engine.entitiesList[data];
			});

			this.socket.on('new_user_join', function (data) {
					new Engine.User('user', data.uid, data.position, data.color);
			});
			
			this.socket.on('update_user', function (data){
				Logger.info('User target:', data);
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
	Logger.info('-> ', Server);
	Logger.groupEnd();
	return Server;
});