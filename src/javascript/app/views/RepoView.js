var BaseView = require('views/BaseView');
var template = require('templates/repo.hbs');

module.exports = BaseView.extend({

    tagName: 'li',

    template: template,

    events: {
      "click": "toggleMetadata"
    },

    toggleMetadata: function(e){
        this.$el.toggleClass("metadata-show");
    }

});
