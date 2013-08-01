/*
  @file: router.js
  
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
], function (Utils, Backbone) {
  
  console.log('Loading Router module for UI...');
  
  var Router = Backbone.Router.extend({

    initialize: function(options) {
      this.bind('route', this.trackPageview);
      
    },

    routes: {
      ''          : 'index',
      'about'     : 'about',
      'lab'       : 'lab',
      'lab/:page' : 'labView',
      'work'      : 'work',
      'asterisk'  : 'asterisk',
      '*path'     : 'bad'
    },

    index: function() {
      UI.Controllers.Index.render( function() {
        UI.Controllers.Timber.render();
      });
    },

    about: function() {
      UI.Controllers.Index.render( function() {
        UI.Controllers.About.render();
      });
    },

    lab: function() {
      UI.Controllers.Index.render( function() {
        UI.Controllers.Lab.render();
      });
    },
    
    work: function() {
      UI.Controllers.Index.render( function() {
        UI.Controllers.Work.render();
      });
    },

    asterisk: function() {
      UI.Controllers.Index.render( function() {
        UI.Controllers.Asterisk.render();
      });
    },

    bad: function() {
      UI.Controllers.Bad.render('404');
    },

    labView: function(page) {
      UI.Controllers.Index.render( function() {
        UI.Controllers.Lab.render(page);
      });
    },

    trackPageview: function () {
        var url = Backbone.history.fragment;
        //console.log(url);
        if (!/^\//.test(url) && url != '') {
            url = "/" + url;
        }
        _gaq.push(['_trackPageview', url]);
    }

  });
  console.log('                             ...loaded.');

  return Router;
});