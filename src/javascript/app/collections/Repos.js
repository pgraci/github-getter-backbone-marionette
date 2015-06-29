var Repo = require('models/Repo');

module.exports = Backbone.Collection.extend({

  model: Repo,

  parse: function(results) {
    return results.repositories;
  }

});
