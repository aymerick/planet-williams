import Ember from 'ember';

export default Ember.View.extend({
  templateName: "views/pw-legend-item",

  legendView: function() {
    return this.get('parentView');
  }.property(),

  containerView: function() {
    return this.get('legendView').get('parentView');
  }.property(),

  mapView: function() {
    return this.get('containerView').get('mapView');
  }.property(),

  mapMarkers: function() {
    var markerCollectionLayer = this.get('mapView').get('childLayers').find(function(layer){
      return layer instanceof EmberLeaflet.MarkerCollectionLayer;
    });

    return markerCollectionLayer.get('childLayers');
  }.property(),

  panMapToMarker: function() {
    this.get('mapView')._layer.panTo(this.content.location, { 'animate': true });
  },

  openMapMarkerPopup: function() {
    var marker = this.get('mapMarkers').findBy('location', this.content.location);
    if (marker._layer._map) {
      marker.openPopup({ 'latlng': this.content.location });
    }
  },

  // callback when item is clicked
  click: function() {
    this.panMapToMarker();
    this.openMapMarkerPopup();
  }
});
