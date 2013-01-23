
define([
       'jquery',
       'underscore',
       'backbone',
       'collections/patients',
       'models/patient',
       'views/patient_list',
       'views/patient_modify',
       'views/patient_show'
], function( $, _, Backbone, patientCollection, Patient, PatientListView, PatientModifyView, PatientShowView ) {

    var AppRouter = Backbone.Router.extend({

        routes: {
            "": "home",
            "patients/new": "patientNew",
            "patients/edit/:id": "patientEdit",
            "patients/show/:id": "patientShow",
            "patients/list": "patientsList",
            "apps/list": "appList"
        },

        home: function() {
        },

        patientNew: function() {
            new PatientModifyView( {model: new Patient()} );
        },

        patientEdit: function( id ) {
            new PatientModifyView( {model: patientCollection.get( id )} );
        },

        patientShow: function( id ) {
            return new PatientShowView( {model: patientCollection.get( id )} );
        },

        patientsList: function() {
            new PatientListView( {collection: patientCollection} );
        }

    });

    return AppRouter;

});
