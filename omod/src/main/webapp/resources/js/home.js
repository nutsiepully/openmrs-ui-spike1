
require([
    'main'
], function( main ) {

    // Ensure main.js is loaded which sets up the configuration.

    require([
        'backbone',
        'views/app_list',
        'routers/app_router'
    ], function( Backbone, AppListView, AppRouter ) {

        console.log( Backbone );

        var router = new AppRouter();
//        router.navigate( 'apps', {trigger: true} );

        Backbone.history.start();
    });

});
