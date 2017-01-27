//Based on https://github.com/tastejs/todomvc/blob/gh-pages/examples/backbone_require/js/main.js

/*global require*/
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },
    paths: {
        //jquery: 'https://code.jquery.com/jquery-3.1.1.min',
        jquery: 'https://code.jquery.com/jquery-3.1.1',
        //underscore: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min',
        underscore: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore',
        //backbone: 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min',
        backbone: 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone',
        //handlebars: 'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.6/handlebars.runtime.amd.min'
        handlebars: 'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.6/handlebars.runtime.amd'
    }
});

require([
    'backbone',
    'views/app',
    'routers/router'
], function(
    Backbone,
    AppView,
    Workspace
) {
    /*jshint nonew:false*/
    // Initialize routing and start Backbone.history()
    new Workspace();
    Backbone.history.start();

    // Initialize the application view
    new AppView();
});
