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
  templateName: 'views/popup'
});

var MarkerLayer = EmberLeaflet.MarkerLayer.extend(
  EmberLeaflet.PopupMixin, {
    popupViewClass: PopupViewClass,
    locationBinding: 'content.location',
    popupOptions: {
      'closeButton': false,
      'minWidth': '300',
      'maxWidth': '300',
      'offset': L.point(0, -36)
    }
  }
);

var MarkerCollectionLayer = EmberLeaflet.MarkerCollectionLayer.extend({
  content: Ember.computed.alias('controller'),
  itemLayerClass: MarkerLayer
});

var MarkerClusterLayer = EmberLeaflet.ContainerLayer.extend({
  childLayers: [ MarkerCollectionLayer ],
  _newLayer: function() {
    return new L.MarkerClusterGroup({ spiderfyOnMaxZoom: false, showCoverageOnHover: false, maxClusterRadius: 10 });
  }
});

export default EmberLeaflet.MapView.extend({
  center: L.latLng(37.76, -3.79),
  zoom: 3,
  options: {
    maxZoom: 18,
    minZoom: 2
  },
  childLayers: [ TileLayer, MarkerClusterLayer ],

  didCreateLayer: function() {
    this._super();
    L.control.locate({ locateOptions: {
      maxZoom: 8
    }}).addTo(this._layer);
  }
});
