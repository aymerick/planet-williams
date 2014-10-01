/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var mergeTrees = require('broccoli-merge-trees');
var pickFiles  = require('broccoli-static-compiler');
var emberI18nPrecompile = require('broccoli-ember-i18n-precompile');

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

// precompile I18n files
var appTranslations = emberI18nPrecompile("app/translations", { outputFolder: 'locale' });

// bootstrap
app.import('bower_components/bootstrap/dist/css/bootstrap.css');
app.import('bower_components/bootstrap/dist/js/bootstrap.js');

var extraBootstrapAssets = pickFiles('bower_components/bootstrap/dist/fonts', {
  srcDir: '/',
  files: ['**/*'],
  destDir: '/fonts'
});

// leaflet
app.import('bower_components/leaflet-dist/leaflet.css');
app.import('bower_components/leaflet-dist/leaflet.js');

var extraLeafletAssets = pickFiles('bower_components/leaflet-dist', {
  srcDir: '/',
  files: ['images/*.png'],
  destDir: '/'
});

// leaflet.locatecontrol
app.import('bower_components/leaflet.locatecontrol/src/L.Control.Locate.css');
app.import('bower_components/leaflet.locatecontrol/src/css/locate-fa.css');
app.import('bower_components/leaflet.locatecontrol/src/css/animation.css');
app.import('bower_components/leaflet.locatecontrol/src/L.Control.Locate.js');

var extraLeafletLocateControlAssets = pickFiles('bower_components/leaflet.locatecontrol/src', {
  srcDir: '/',
  files: ['font/*.eot', 'font/*.svg', 'font/*.ttf', 'font/*.woff'],
  destDir: '/'
});

// ember-leaflet
app.import('bower_components/ember-leaflet/dist/ember-leaflet.js');

// ember-i18n
app.import('bower_components/cldr/plurals.js');
app.import('bower_components/ember-i18n/lib/i18n.js');

module.exports = mergeTrees([
  appTranslations,
  app.toTree(),
  extraBootstrapAssets,
  extraLeafletAssets,
  extraLeafletLocateControlAssets
]);
