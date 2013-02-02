
define([
    'underscore',
    'backbone'
], function( _, Backbone ) {

    var App = Backbone.Model.extend({

        url: function() {
            var base = 'apps';
            if (this.isNew()) return base;
            return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
        },

        appLink: function() {
            return document.location.origin + '/' + this.attributes.homepageUrl;
        },

        toJSON: function() {
            return _.extend( {}, this.attributes, { appLink: this.appLink() } );
        }

    });

    return App;
});
