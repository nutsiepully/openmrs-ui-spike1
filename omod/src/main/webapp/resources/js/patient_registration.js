
require([
    'main'
], function( main ) {
    // Ensure main.js is loaded which sets up the configuration.

    require([
        'backbone',
        'views/patient_list',
        'routers/router',
        'collections/patients'
    ], function( Backbone, PatientListView, Router, patientCollection ) {

        patientCollection.create( {firstName: 'Pulkit', lastName: 'Bhuwalka', 'gender': 'male', birthDate: '13 Sep', address: 'address', number: '90002' } );
        patientCollection.create( {firstName: 'Calvin', lastName: 'Hobbes', 'gender': 'male', birthDate: '13 Sep', address: 'address', number: '90001' } );
        patientCollection.create( {firstName: 'V', lastName: 'Vendetta', 'gender': 'male', birthDate: '13 Sep', address: 'address', number: '90003' } );

//        require( ['xrayApp/main'], function( xray ) { } )

        var router = new Router();
        router.navigate( 'patients/list', {trigger: true} )
    });

});
