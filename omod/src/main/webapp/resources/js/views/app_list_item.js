
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/app_list_item.html'
], function( $, _, Backbone, AppListItemTemplate ) {

    var AppListItemView = Backbone.View.extend({

        tagName: 'li',

        template: _.template( AppListItemTemplate ),

        initialize: function() {
            this.listenTo( this.model, 'all', this.render );
            this.render();
        },

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        }

    });

    return AppListItemView;

});
