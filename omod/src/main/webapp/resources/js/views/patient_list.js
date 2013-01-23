
define([
    'jquery',
    'underscore',
    'backbone',
    'views/patient_list_item',
    'text!templates/patient_list.html'
], function( $, _, Backbone, PatientListItemView, PatientListTemplate ) {

    var PatientListView = Backbone.View.extend({

        el: '.hero-unit',

        template: _.template( PatientListTemplate ),

        initialize: function() {
            this.listenTo( this.collection, 'all', this.render );
            this.render();
        },

        render: function() {
            this.$el.html( this.template() );

            this.collection.each( function( patient ) {
                $('#patient-list').append( new PatientListItemView( {model: patient} ).render().el );
            });

            return this;
        }

    });

    return PatientListView;

});
