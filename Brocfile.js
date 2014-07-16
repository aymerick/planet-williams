/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var mergeTrees = require('broccoli-merge-trees');
var pickFiles  = require('broccoli-static-compiler');

var app = new EmberApp();

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

// bootstrap
app.import('vendor/bootstrap/dist/css/bootstrap.css');
app.import('vendor/bootstrap/dist/js/bootstrap.js');

// leaflet
app.import('vendor/leaflet-dist/leaflet.css');
app.import('vendor/leaflet-dist/leaflet.js');

var extraLeafletAssets = pickFiles('vendor/leaflet-dist', {
  srcDir: '/',
  files: ['images/*.png'],
  destDir: '/'
});

// leaflet.markercluster
// app.import('vendor/leaflet.markercluster/dist/MarkerCluster.css');
// app.import('vendor/leaflet.markercluster/dist/MarkerCluster.Default.css');
// app.import('vendor/leaflet.markercluster/dist/leaflet.markercluster-src.js');

// leaflet-locatecontrol
app.import('vendor/leaflet-locatecontrol/src/L.Control.Locate.css');
app.import('vendor/leaflet-locatecontrol/src/font/locate-fa.eot');
app.import('vendor/leaflet-locatecontrol/src/css/locate-fa.css');
app.import('vendor/leaflet-locatecontrol/src/css/animation.css');
app.import('vendor/leaflet-locatecontrol/src/L.Control.Locate.js');

var extraLeafletLocateControlAssets = pickFiles('vendor/leaflet-locatecontrol/src', {
  srcDir: '/',
  files: ['font/*.eot', 'font/*.svg', 'font/*.ttf', 'font/*.woff'],
  destDir: '/'
});

// ember-leaflet
app.import('vendor/ember-leaflet/dist/ember-leaflet.js');

module.exports = mergeTrees([app.toTree(), extraLeafletAssets, extraLeafletLocateControlAssets]);
