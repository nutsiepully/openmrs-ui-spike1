
require([
    'main'
], function( main ) {

    // Ensure main.js is loaded which sets up the configuration.

    require([
        'backbone',
        'views/app_list',
        'routers/router'
    ], function( Backbone, AppListView, Router ) {

        console.log( Backbone );

        router = new Router();
        router.navigate( 'apps', {trigger: true} );
    });

});

//require([
//    'main',
//    'backbone',
//    'views/app_list',
//    'routers/router'
//], function( main, Backbone, AppListView, Router ) {
//
//    router = new Router();
//    router.navigate('');
//});
