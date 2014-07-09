import Ember from 'ember';

var Pin = Ember.Object.extend({
  popupContent: function() {
    return this.get('title') || this.get('org');
  }.property('title', 'org')
});

Pin.reopenClass({
  all: function() {
    return Ember.$.getJSON('/pins.json').then(function(pins){
      return pins.map(function(data) {
        return Pin.create(data);
      });
    });
  }
});

export default Pin;
