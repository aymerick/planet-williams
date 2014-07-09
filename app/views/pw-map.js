import Ember from 'ember';

var TileLayer = EmberLeaflet.TileLayer.extend({
  tileUrl: 'https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png',
  options: {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'examples.map-i86knfo3'
  }
});

var MarkerLayer = EmberLeaflet.MarkerLayer.extend(
  EmberLeaflet.PopupMixin, {
    popupContentBinding: 'content.popupContent',
    locationBinding: 'content.location'
  }
);

var MarkerCollectionLayer = EmberLeaflet.MarkerCollectionLayer.extend({
  content: Ember.computed.alias('controller'),
  itemLayerClass: MarkerLayer
});

export default EmberLeaflet.MapView.extend({
  center: L.latLng(37.76, -3.79),
  zoom: 3,
  options: {
    maxZoom: 18,
    minZoom: 2
  },
  childLayers: [ TileLayer, MarkerCollectionLayer ]

  // @todo https://github.com/domoritz/leaflet-locatecontrol
  //
  // didCreateLayer: function() {
  //   this._super();
  //   L.control.locate().addTo(this._layer);
  // }
});
