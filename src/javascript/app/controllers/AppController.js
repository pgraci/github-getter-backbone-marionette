var app = require('app/app');
var Backbone = require('backbone');
var channels = require('channels');

// Models
var Repo = require('models/Repo');

// Collections

// Views
var GlobalView = require('views/GlobalView');
var BaseView = require('views/BaseView');
var HeaderView = require('views/HeaderView');
var SearchView = require('views/SearchView');
var Error404View = require('views/Error404View');

module.exports = Backbone.Marionette.Controller.extend({

    initialize: function () {

        // State checks
        app.onload = true;

        // Bootstrap it, gurrl
        this.bootstrap();

        var headerView = new HeaderView();
        app.regionHeader.show(headerView);

    },

    bootstrap: function () {
        this.globalView = new GlobalView();
        this.baseView = new BaseView();

        channels.globalChannel.on('navigate', this.navigate, this);

    },

    navigate: function (options) {

        // If navigate() is being called...
        // we must be past our initial page load
        // so we'll set onload to 'false'
        app.onload = false;

        var url = options.url;
        var trigger = options.trigger ? options.trigger : false;

        app.appRouter.navigate(url, {
            trigger: trigger
        });

    },


    /* View Routes
    =========================================== */

    index: function () {
        var searchView = new SearchView();
        app.regionSearch.show(searchView);
    },

    error404: function() {
        var error404View = new Error404View();
        app.regionMain.show(error404View);
    },

    defaultHandler: function (route) {
        console.log('%cRoute /%s does not exist', 'color:white; background:gray; padding: 0 0.25em', route);
        this.error404();
    }

});
