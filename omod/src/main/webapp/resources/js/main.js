
var paths_config = {
    jquery: 'lib/jquery/jquery',
    underscore: 'lib/underscore/underscore',
    backbone: 'lib/backbone/backbone',
    backboneLocalstorage: 'lib/backbone/backbone.localStorage',
    bootstrap: 'lib/bootstrap/bootstrap',
    text: 'lib/require/text',
    main: '.'
};

var shim_config = {
    underscore: {
        exports: '_'
    },
    backbone: {
        deps: [
            'underscore',
            'jquery'
        ],
        exports: 'Backbone'
    },
    backboneLocalstorage: {
        deps: ['backbone'],
        exports: 'Store'
    },
    bootstrap: {
        deps: ['jquery'],
        exports: 'bootstrap'
    }
};

// load apps
// current URL - http://localhost:8080/openmrs/moduleResources/spike1/js/
var moduleResourcesDirectory = '../../'
var hostname = '../../../../'
var appListUrl = hostname + 'openmrs/module/spike1/appList.json'
var appList;

var appListJson = $.ajax({
    type: "GET",
    url: appListUrl,
    async: false
}).responseText;

appList = JSON.parse( appListJson );

appList.apps.forEach( function( app ) {
    console.log( app.label );

    function excludeLastPart(url) {
        return url.substr(0, url.lastIndexOf('/'));
    }

    paths_config[app['id']] = excludeLastPart(hostname + app['homepageUrl']) + '/js/';
//    shim_config[app['id']] = hostname + app['homepageUrl'];
});

console.log(paths_config);
console.log(shim_config);

require.config({

    // This is a hack here, this path should be made relative.
    baseUrl: 'http://localhost:8080/openmrs/moduleResources/spike1/js/',

    shim: shim_config,

    paths: paths_config
});

define([
    'backbone',
    'collections/apps'
], function( Backbone, appCollection ) {

    appCollection.each(function(model) { model.destroy(); } )
    appList.apps.forEach( function( app ) {
        appCollection.create( {id: app.id, label: app.label, homepageUrl: app.homepageUrl} );
    });
});
