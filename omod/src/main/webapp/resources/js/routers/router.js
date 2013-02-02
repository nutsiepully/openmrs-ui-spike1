
define([
       'jquery',
       'underscore',
       'backbone',
       'collections/patients',
       'models/patient',
       'views/patient_list',
       'views/patient_modify',
       'views/patient_show',
       'collections/apps',
       'views/app_list'
], function( $, _, Backbone, patientCollection, Patient, PatientListView,
             PatientModifyView, PatientShowView, appCollection, AppListView ) {

    var AppRouter = Backbone.Router.extend({

        routes: {
            "": "home",
            "apps": "home",
            "patients/new": "patientNew",
            "patients/edit/:id": "patientEdit",
            "patients/show/:id": "patientShow",
            "patients/list": "patientsList"
        },

        home: function() {
            new AppListView( {collection: appCollection} );
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
