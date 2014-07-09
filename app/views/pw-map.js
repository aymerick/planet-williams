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

var PopupViewClass = Ember.View.extend({
  template: Ember.Handlebars.compile(
    '<div class="popup-custom-view">' +
    '  <img {{bind-attr src=view.content.photo}} class="popup-photo" />' +
    '  <span class="popup-title">{{view.content.popupTitle}}</span>' +
    '  <div class="popup-desc">{{view.content.popupDescription}}</div>' +
    '  <a {{bind-attr href=view.content.url}} class="popup-url">website</a>' +
    '</div>'
  )
});

var MarkerLayer = EmberLeaflet.MarkerLayer.extend(
  EmberLeaflet.PopupMixin, {
    popupViewClass: PopupViewClass,
    locationBinding: 'content.location',
    popupOptions: {
      'closeButton': false,
      'minWidth': '200',
      'maxWidth': '300',
      'offset': L.point(0, -36)
    }
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
