var BaseView = require('./BaseView');
var template = require('templates/header.hbs');

module.exports = BaseView.extend({

    className: 'page page-index',

    template: template

});
