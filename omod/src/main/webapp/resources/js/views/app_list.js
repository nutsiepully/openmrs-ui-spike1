
define([
    'jquery',
    'underscore',
    'backbone',
    'views/app_list_item'
], function( $, _, Backbone, AppListItemView, AppListTemplate) {

    var AppListView = Backbone.View.extend({

        el: '.hero-unit',

        template: _.template( AppListTemplate ),

        initialize: function() {
            this.listenTo( this.collection, 'all', this.render );
            this.render();
        },

        render: function() {
            this.$el.html( this.template() );

            this.collection.each( function( app ) {
                $('#app-list').append( new AppListItemView( {model: app} ).render().el );
            });

            return this;
        }

    });

    return AppListView;

});
