var Marionette = require('backbone.marionette');
var RepoView = require('views/RepoView');

module.exports = Marionette.CollectionView.extend({

    tagName: 'ul',
    childView: RepoView

});
