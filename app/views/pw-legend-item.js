import Ember from 'ember';

export default Ember.View.extend({
  templateName: "views/pw-legend-item",

  click: function() {
    // FIXME: Ouch ! That's ugly ! Find a way to get indexView cleanly
    var indexView = this.get('parentView').get('parentView');

    var mapLeafletLayer = indexView.get('mapView')._layer;

    // move map
    mapLeafletLayer.panTo(this.content.location, { 'animate': true });

    // FIXME: Beuuuurk ! Find a way to get markes layers cleanly
    var markers = indexView.get('mapView').objectAt(1).get('childLayers');
    // var markers = indexView.get('mapView').objectAt(1).get('childLayers')[0].get('childLayers');

    // find marker
    var marker = markers.findBy('location', this.content.location);
    if (marker._layer._map) {
      // open marker popup
      marker.openPopup({latlng: this.content.location});
    }
  }
});
