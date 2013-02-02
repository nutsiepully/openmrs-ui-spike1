
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/apps',
    'views/app_list'
], function( $, _, Backbone, appCollection, AppListView ) {

    var AppRouter = Backbone.Router.extend({

        routes:{
            "apps":"apps",
            "*path":"apps"
        },

        apps: function () {
            new AppListView( {collection: appCollection} );
        }

    });

    return AppRouter;

});
