
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/patient_list_item.html'
], function( $, _, Backbone, PatientListItemTemplate ) {

    var PatientListItemView = Backbone.View.extend({

        tagName: 'li',

        template: _.template( PatientListItemTemplate ),

        initialize: function() {
            this.listenTo( this.model, 'all', this.render );
            this.render();
        },

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        }

    });

    return PatientListItemView;

});
