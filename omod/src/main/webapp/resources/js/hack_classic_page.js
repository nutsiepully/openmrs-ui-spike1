
require([
    'main'
], function( main ) {

    // Ensure main.js is loaded which sets up the configuration.

    require([
        'jquery',
        'backbone',
        'views/app_list',
        'collections/apps'
    ], function( $, Backbone, AppListView, appCollection ) {

        console.log( Backbone );
        console.log( appCollection );

        var mainMenuElement = document.createElement('div');
        mainMenuElement.className = 'hero-unit';
        $('body').prepend(mainMenuElement);

        new AppListView( {collection: appCollection}).render();

    });

});
