define([
	'Logger',
], function (Logger) {
	Logger.group('Loading Server...');

	var Server = {
		name: 'Server',

		connect: function (callback) {
			var _server = this;
			this.socket = io.connect('http://' + window.location.hostname + ':5000');
			
			this.socket.on('connect', function () {
				var player = { 
					uid: localStorage.getItem('asterisk.player.UID'),
					color: localStorage.getItem('asterisk.player.color') || '#'+((1<<24)*Math.random()|0).toString(16),
					position: JSON.parse(localStorage.getItem('asterisk.player.position')) || { x: 10, y: 3 }
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
				Engine.entitiesList[data.uid].position.raw = data.position;
			});

			this.socket.on('player_active_state', function (data) {
				Engine.entitiesList[data.uid].active = data;
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