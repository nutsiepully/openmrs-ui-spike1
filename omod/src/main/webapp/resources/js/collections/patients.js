
define([
    'underscore',
    'backbone',
    'backboneLocalstorage',
    'models/patient'
], function( _, Backbone, Store, Patient ) {

    var PatientCollection = Backbone.Collection.extend({

        model: Patient,

        url: '/patients',

        localStorage: new Store('patients')
    });

    return new PatientCollection();
});
