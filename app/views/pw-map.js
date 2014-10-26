import Ember from 'ember';

var TileLayer = EmberLeaflet.TileLayer.extend({
  tileUrl: 'https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png',
  options: {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'aymerick.k2a34cfb'
  }
});

var PopupViewClass = Ember.View.extend({
  templateName: 'views/pw-map-popup',

  actions: {
    externalClick: function(url) {
      // track event
      this.container.lookup('router:main').notifyGoogleAnalyticsEvent('map', 'externalClick', url);

      // follow URL
      window.open(url, '_blank');
    }
  }
});

var MarkerLayer = EmberLeaflet.MarkerLayer.extend(
  EmberLeaflet.PopupMixin, {
    popupViewClass: PopupViewClass,
    locationBinding: 'content.location',
    popupOptions: {
      'closeButton': false,
      'minWidth': '200',
      'maxWidth': '200',
      'offset': L.point(0, -36)
    },

    didOpenPopup: function() {
      // track event
      this.container.lookup('router:main').notifyGoogleAnalyticsEvent('map', 'openPopup', this.content.get('gaEventLabel'));
    }
  }
);

var MarkerCollectionLayer = EmberLeaflet.MarkerCollectionLayer.extend({
  content: Ember.computed.alias('controller'),
  itemLayerClass: MarkerLayer
});

export default EmberLeaflet.MapView.extend({
  viewName: 'mapView',
  childLayers: [ TileLayer, MarkerCollectionLayer ],

  center: L.latLng(37.76, -3.79),
  zoom: 3,
  options: {
    maxZoom: 18,
    minZoom: 2
  },

  didCreateLayer: function() {
    this._super();
    L.control.locate({ locateOptions: {
      maxZoom: 8
    }}).addTo(this._layer);
  }
});
