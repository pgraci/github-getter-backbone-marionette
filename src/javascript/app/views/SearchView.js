var BaseView = require('views/BaseView');
var template = require('templates/search.hbs');

var ReposCollection = require('collections/Repos');

var ReposView = require('views/ReposView');

module.exports = BaseView.extend({

    template: template,
    className: 'searchbox',

    events: {
      'click button.js-search-button': 'searchButton',
      'keypress #search' : 'searchKeywords'
    },

    initialize: function () {

      var results = new ReposCollection();
      this.results = results;
      this.resultscache = {};
    },

    searchButton: function(e){
      e.stopPropagation();

      var keywords = $('#search').val();
      if(keywords === '') return;

      this.doFetch(keywords);
    },

    searchKeywords: function(e){
      if ( e.which === 13 ) {

        var keywords = $('#search').val();
        if(keywords === '') return;

        this.doFetch(keywords);
      }
    },

    doFetch: function(keywords){

        if (this.resultscache[keywords] == this.results) {

          this.showResults(this.resultscache[keywords]);

          console.log('%cloaded %s from Cache', 'color:white; background:green; padding: 0 0.25em', keywords);

        } else {

          this.results.fetch({
             url: 'https://api.github.com/legacy/repos/search/' + keywords
          }).then(_.bind(function() {

             this.resultscache[keywords] = this.results;

             this.showResults(this.results);

          }, this));

          console.log('%cloaded %s from API', 'color:white; background:blue; padding: 0 0.25em', keywords);

        }

    },

    showResults: function(results){

           reposView = new ReposView({
             collection: results
           });

           app.regionMain.show(reposView);

    }





});
