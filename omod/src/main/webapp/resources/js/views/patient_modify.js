
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/patient_modify.html',
    'collections/patients',
    'routers/patient_router'
], function( $, _, Backbone, PatientModifyTemplate, patientCollection, Router ) {

    var PatientModifyView = Backbone.View.extend({

        el: '.hero-unit',

        events: {
            'click #patient-create': 'save'
        },

        template: _.template( PatientModifyTemplate ),

        initialize: function() {
//            this.listenTo( this.model, 'all', this.render );
            this.render();
        },

        render: function() {
            this.$el.html( this.template( { data: this.model.toJSON() } ) );
            return this;
        },

        modelFromInterface: function() {
            return {
                firstName: this.$('[name=firstName]').val(),
                lastName: this.$('[name=lastName]').val(),
                gender: this.$('[name=gender]').val(),
                birthDate: this.$('[name=birthDate]').val(),
                address: this.$('[name=address]').val(),
                number: this.$('[name=number]').val()
            };
        },

        clearInput: function() {
            this.$('[name=firstName]').val('');
            this.$('[name=lastName]').val('');
            this.$('[name=gender]').val('');
            this.$('[name=birthDate]').val('');
            this.$('[name=address]').val('');
            this.$('[name=number]').val('');
        },

        save: function() {
            if (this.model.isNew()) {
                this.model = patientCollection.create( this.modelFromInterface() );
            } else {
                this.model.save( this.modelFromInterface() );
            }
            this.clearInput();

            this.$el.html('');
            this.unbind();
            this.undelegateEvents();

            Backbone.history.navigate( '#patients/show/' + this.model.attributes.id, { trigger: true } );
//            (new Router()).navigate( '#patients/show/' + this.model.attributes.id, { trigger: true } );
        }

    });

    return PatientModifyView;

});
