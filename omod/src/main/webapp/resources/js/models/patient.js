
define([
    'underscore',
    'backbone'
], function( _, Backbone ) {

    var Patient = Backbone.Model.extend({

        name: function() {
            return this.attributes.firstName + ' ' + this.attributes.lastName;
        },

        url: function() {
            var base = 'patients';
            if (this.isNew()) return base;
            return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
        },

        toJSON: function() {
            return _.extend( {}, this.attributes, { name: this.name(), url: this.url() } );
        }

    });

    return Patient;
});
