export default {
  name: 'leaflet',

  initialize: function(/* container, app */) {
    /* Fix layer and marker images path */
    L.Icon.Default.imagePath = '/images';
  }
};
