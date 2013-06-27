define([
	'utils',
	'backbone',
	'underscore',
], function(Utils, Backbone, _) {
	
	console.log('Loading timber collection module for UI...');
	
	var TimberModel = Backbone.Model.extend({});
	
	var TimberCollection = Backbone.Collection.extend({
		initialize: function() {
			console.log('Timber collection init.');
		},

		model: TimberModel,
		
		url: '/timber',

	  comparator: function(log) {
	   	var log = new Date(log.get('created_at'));
	    return -log.getTime();
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
	    UI.fetchTimberCount++;
	    if (UI.fetchTimberInProgress !== -1) {
	      UI.fetchTimberInProgress = 1;
	    }
	    options.success = function() {
	      if (UI.fetchTimberCount > 1) {
	        UI.fetchTimberInProgress = -1;
	        return UI.fetchStoriesCount--;
	      } else {
	        UI.fetchTimberInProgress = 0;
	        UI.fetchTimberCount = 0;
	        if (options.remove === true) {
	        	//UI.Controllers.Timber.render();
	        }
	        return $('.loader').remove();
	      }
	    };
	    options.error = function(model, res) {
	    	
	    	UI.Controllers.Bad.render(res.status, 'Something\'s wrong!<br />Couldn\'t get data from the server.<br />Sounds like an "' + res.statusText + '".');
	    }
	    // $('#loadMore').fadeOut(100);
	    // if (options.remove !== false) {
	    //   $('#stories').html('');
	    // }
	    // $('#stories').append('<div class="loader"></div>');
	    // $('.loader').fadeIn(100);
	    return Backbone.Collection.prototype.fetch.call(this, options);
	  }
	});
	console.log('										...loaded.');
	return TimberCollection;
});

