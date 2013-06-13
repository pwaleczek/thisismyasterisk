/*
	@file: utils.js
	
	Copyright (c) 2013 Pawel Waleczek [pawel@thisismyasterisk.org], All rights reserved.

	THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF
	ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
	IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR
	PURPOSE.

	Please see the license.txt file for more information.
*/

define(function() {
	console.log('Loading Utilities module for anything...');

	// do some math
	Math.fact = function(m) {
		function f(n) {
			
  		if (n === 0 || n === 1)
    		return 1;
  		else
      return f(n-1)*n;
		}
		return f(m);
	}

	Math.newt = function(j, k) {
		if(j == 0 || j == k) return 1;
		return Math.fact(j) / (Math.fact(k) * Math.fact(j -1));
	}

	//Array.prototype;

	Array.prototype.exists = function(o, index) {
		//console.log(o instanceof Array);
		index = !!index;
		for(var i = 0; i < this.length; i++)
			if(o instanceof Array) {
				
				if(this[i][0] === o[0] && this[i][1] === o[1]) {
					return (index) ? true : i;
					console.log('exists: ' + o);
					console.log(this);
				}
			} else {
				if(this[i] === o)
				return (index) ? true : i;
			}
		return false;
	}

	// Utilities
	var Utils = {
		name: 'Utilities',
		
		sqrt3: Math.sqrt(3),
		
		aStar: {
			/*
			Copyright (C) 2009 by Benjamin Hardin

			Permission is hereby granted, free of charge, to any person obtaining a copy
			of this software and associated documentation files (the "Software"), to deal
			in the Software without restriction, including without limitation the rights
			to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
			copies of the Software, and to permit persons to whom the Software is
			furnished to do so, subject to the following conditions:

			The above copyright notice and this permission notice shall be included in
			all copies or substantial portions of the Software.

			THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
			IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
			FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
			AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
			LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
			OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
			THE SOFTWARE.

			@modified for own purpoues

			*/
			searchPath: function (start, destination, board /*, columns, rows, allow_diagonals*/)
			{
				//Create start and destination as true nodes
				var allow_diagonals = false;//!!allow_diagonals;
				var columns = board.length;
				var rows = board[0].length;
				
				
				// console.log(JSON.stringify(Utils.transposeArray(board)));
				start = new this.node(start.x, start.y, -1, -1, -1, -1);
				destination = new this.node(destination.x, destination.y, -1, -1, -1, -1);
				board = Utils.transposeArray(board);
				//console.log(Utils.)
				var open = []; //List of open nodes (nodes to be inspected)
				var closed = []; //List of closed nodes (nodes we've already inspected)

				var g = 0; //Cost from start to current node
				var h = this.heuristic(start, destination); //Cost from current node to destination
				var f = g+h; //Cost from start to destination going through the current node

				//Push the start node onto the list of open nodes
				open.push(start); 

				//Keep going while there's nodes in our open list
				while (open.length > 0)
				{
					//Find the best open node (lowest f value)

					//Alternately, you could simply keep the open list sorted by f value lowest to highest,
					//in which case you always use the first node
					var best_cost = open[0].f;
					var best_node = 0;

					for (var i = 1; i < open.length; i++)
					{
						if (open[i].f < best_cost)
						{
							best_cost = open[i].f;
							best_node = i;
						}
					}

					//Set it as our current node
					var current_node = open[best_node];

					//Check if we've reached our destination
					if (current_node.x == destination.x && current_node.y == destination.y)
					{
						var path = [destination]; //Initialize the path with the destination node

						//Go up the chain to recreate the path 
						while (current_node.parent_index != -1)
						{
							current_node = closed[current_node.parent_index];
							path.unshift(current_node);
						}

						return path;
					}

					//Remove the current node from our open list
					open.splice(best_node, 1);

					//Push it onto the closed list
					closed.push(current_node);

					//Expand our current node (look in all 8 directions)
					for (var new_node_x = Math.max(0, current_node.x-1); new_node_x <= Math.min(columns-1, current_node.x+1); new_node_x++)
						for (var new_node_y = Math.max(0, current_node.y-1); new_node_y <= Math.min(rows-1, current_node.y+1); new_node_y++)
						{
							if (!allow_diagonals)
							{
								if (new_node_x != current_node.x && new_node_y != current_node.y)
									continue;
							}

							if (board[new_node_x][new_node_y] == 1 //If the new node is open
								|| (destination.x == new_node_x && destination.y == new_node_y)) //or the new node is our destination
							{
								//See if the node is already in our closed list. If so, skip it.
								var found_in_closed = false;
								for (var i in closed)
									if (closed[i].x == new_node_x && closed[i].y == new_node_y)
									{
										found_in_closed = true;
										break;
									}

								if (found_in_closed)
									continue;

								//See if the node is in our open list. If not, use it.
								var found_in_open = false;
								for (var i in open)
									if (open[i].x == new_node_x && open[i].y == new_node_y)
									{
										found_in_open = true;
										break;
									}

								if (!found_in_open)
								{
									var new_node = new this.node(new_node_x, new_node_y, closed.length-1, -1, -1, -1);

									new_node.g = current_node.g + Math.floor(Math.sqrt(Math.pow(new_node.x-current_node.x, 2)+Math.pow(new_node.y-current_node.y, 2)));
									new_node.h = this.heuristic(new_node, destination);
									new_node.f = new_node.g+new_node.h;

									open.push(new_node);
								}
							}
						}
				}

				return [];
			},

			//An A* heurisitic must be admissible, meaning it must never overestimate the distance to the goal.
			//In other words, it must either underestimate or return exactly the distance to the goal.
			heuristic: function (current_node, destination)
			{
				//Find the straight-line distance between the current node and the destination. (Thanks to id for the improvement)
				//return Math.floor(Math.sqrt(Math.pow(current_node.x-destination.x, 2)+Math.pow(current_node.y-destination.y, 2)));
				var x = current_node.x-destination.x;
				var y = current_node.y-destination.y;
				return x*x+y*y;
			},


			/* Each node will have six values: 
			 X position
			 Y position
			 Index of the node's parent in the closed array
			 Cost from start to current node
			 Heuristic cost from current node to destination
			 Cost from start to destination going through the current node
			*/	

			node: function (x, y, parent_index, g, h, f)
			{
				this.x = x;
				this.y = y;
				this.parent_index = parent_index;
				this.g = g;
				this.h = h;
				this.f = f;
			}
		},

		rotateArray: function(array, deg, direction) {
		    var temp = [];
		    var i, j;
		    for(i = 0; i < array.length; ++i){
		        temp[i] = [];
		        for (j = 0; j < array[i].length; ++j){
		            temp[i][j] = array[temp.length - j - 1][i];
		        }
		    }
		    return temp;
		},

		transposeArray: function(array) {
		// Calculate the width and height of the Array
			var a = array,
			w = a.length ? a.length : 0,
			h = a[0] instanceof Array ? a[0].length : 0;

			// In case it is a zero matrix, no transpose routine needed.
			if(h === 0 || w === 0) { return []; }

			/**
			* @var {Number} i Counter
			* @var {Number} j Counter
			* @var {Array} t Transposed data is stored in this array.
			*/
			var i, j, t = [];

			// Loop through every item in the outer array (height)
			for(i=0; i<h; i++) {

			// Insert a new row (array)
			t[i] = [];

			// Loop through every item per item in outer array (width)
			for(j=0; j<w; j++) {

			  // Save transposed data.
			  t[i][j] = a[j][i];
			}
			}
			console.log(t);
			return t;
		},

		imagePreloader: function() {
			var imageList = {};
			var loadItems = 0;
			var loadItemsTotal = arguments[0].length;
			var callback = false;
			
			if(arguments[1] && typeof arguments[1] === 'function') {
				callback = arguments[1];
			}

			this.preloadProgress = 0;
			
			function addLoad(image, name) {
				console.log('Loading image: ' + name + '.');
				this.isPreloaderWorking = true;
				loadItems++;
				image.onload = loadReady;
				image.onerror = function() { debug.error('Failed to load ' + name); };
			}
			function loadReady () {
				loadItems--;
				this.preloadProgress = (loadItemsTotal - loadItems) / loadItemsTotal;
				if(!loadItems) {
					this.isPreloaderWorking = false;
					if(callback) {
						callback(imageList);
					}
				}
			}
			
			for(var i = 0; i < arguments[0].length; i++) {
				var imageName = arguments[0][i];
				var image = new Image;
				addLoad(image, imageName);
				image.src = '/assets/' + imageName + '.png';
				imageList[imageName] = image;
			}

			return imageList;
		},
		
		bezierPosition: function (t, points) {
			var n = points.length || 0;
			var p = [];
			var position = {
				x: 0,
				y: 0
			};
			if (n == 3) {
				position.x = Math.pow(1 - t, 2) * points[0][0] + 2 * (1 - t) * t * points[1][0] + Math.pow(t, 2) * points[2][0];
				position.y = Math.pow(1 - t, 2) * points[0][1] + 2 * (1 - t) * t * points[1][1] + Math.pow(t, 2) * points[2][1];
			} else {
				debug.error('3 points have to be specified.');
			}
			return position;
		},
		
		pointCompare: function(point1, point2, method) {
			method = method || 'exact'
			switch(method) {
				case 'int':
					if((point1.x | 0) != (point2.x | 0) || (point1.y | 0) != (point2.y | 0)) {
						return false;
					}
				break;
				case 'exact':
					if(point1.x != point2.x || point1.y != point2.y) {
						return false;
					}
				break;
			}
			return true;
		},

		attachEvent: function(eventElement, eventName, eventMethod) {
			console.log(this);
			if(typeof eventElement !== 'object') {
				console.error('Event element is not an object!');
				return;
			}
			if(typeof eventMethod === 'function') {
				if(eventElement.attachEvent) {
					eventElement.attachEvent('on' + eventName, eventMethod);
				} else if(window.addEventListener) {
					eventElement.addEventListener(eventName, eventMethod, true);
				} else {
					console.error('Unable to attach event "' + eventName + '" - no support for this. Get a real browser.');
					return;
				}
			} else {
				console.error('Event method is not a function!');
				return;
			}
			console.log('Attached [' + eventName + '] to ' + eventElement + '.');
		},

		detachEvent: function(eventElement, eventName, eventMethod) {
			if(typeof eventElement !== 'object') {
				console.error('Event element is not an object!');
				return;
			}
			if(typeof eventMethod === 'function') {
				if(eventElement.attachEvent) {
					eventElement.attachEvent('on' + eventName, eventMethod);
				} else if(window.addEventListener) {
					eventElement.addEventListener(eventName, eventMethod, true);
				} else {
					console.error('Unable to detach event "' + eventName + '" - no support for this. Get a real browser.');
					return;
				}
			} else {
				console.error('Event method is not a function!');
				return;
			}
			console.log('Detached [' + eventName + '] from ' + eventElement + '.');
		}
	};
	console.log('										...loaded.');
	return Utils;
});