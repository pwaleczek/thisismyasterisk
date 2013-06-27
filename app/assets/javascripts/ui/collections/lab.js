/*
	@file: lab.js
	
	Copyright (c) 2013 Pawel Waleczek [pawel@thisismyasterisk.org], All rights reserved.

	THE SOFTWARE AND DOCUMENTATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF
	ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
	IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR
	PURPOSE.

	Please see the license.txt file for more information.
*/
define([
	'utils',
	'backbone',
	'underscore',
], function(Utils, Backbone, _) {
	
	console.log('Loading lab collection module for UI...');
	
	var LabModel = Backbone.Model.extend({});
	
	var LabCollection = Backbone.Collection.extend({
		initialize: function() {
			console.log('Lab collection init.');
		},

		model: LabModel,
		
		url: '/lab',

	  comparator: function(lab) {
	   	var lab = new Date(log.get('created_at'));
	    return -lab.getTime();
	  },
	  fetch: function(options) {
	    if (typeof options.data === 'undefined') {
	      options.data = {};
	    }
	    // options.data.page = Application.storyType;
	    // options.data.voivodeship = jQuery.parseJSON(Application.Storage.getItem('search.voivodeship')).id;
	    // options.data.city = jQuery.parseJSON(Application.Storage.getItem('search.city')).id;
	    // options.data.duration = jQuery.parseJSON(Application.Storage.getItem('search.duration')).id;
	    // options.data.date_from = jQuery.parseJSON(Application.Storage.getItem('search.date')).date_from;
	    // options.data.date_to = jQuery.parseJSON(Application.Storage.getItem('search.date')).date_to;
	    // options.data.order = Application.Storage.getItem('search.sort');
	    if (typeof options.remove === 'undefined') {
	      options.remove = true;
	    }
	    UI.fetchLabCount++;
	    if (UI.fetchLabInProgress !== -1) {
	      UI.fetchLabInProgress = 1;
	    };

	    options.success = function() {
	      if (UI.fetchLabCount > 1) {
	        UI.fetchLabInProgress = -1;
	        return UI.fetchStoriesCount--;
	      } else {
	        UI.fetchLabInProgress = 0;
	        UI.fetchLabCount = 0;
	        if (options.remove === true) {
	        	//UI.Controllers.Lab.render();
	        }
	        return $('.loader').remove();
	      }
	    };

	    options.error = function(model, res) {
	    	
	    	UI.Controllers.Bad.render(res.status, 'Something\'s wrong!<br />Couldn\'t get data from the server.<br />Sounds like an "' + res.statusText + '".');
	    }

	    return Backbone.Collection.prototype.fetch.call(this, options);
	  }
	});
	console.log('										...loaded.');
	return LabCollection;
});

