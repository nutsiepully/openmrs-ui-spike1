
define([
    'underscore',
    'backbone',
    'backboneLocalstorage',
    'models/app'
], function( _, Backbone, Store, App ) {

    var AppCollection = Backbone.Collection.extend({

        model: App,

        url: '/apps',

        localStorage: new Store('apps')

    });

    return new AppCollection();
});
