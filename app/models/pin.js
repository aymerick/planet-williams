import Ember from 'ember';

var Pin = Ember.Object.extend({
  popupTitle: function() {
    return this.get('title') || this.get('org');
  }.property('title', 'org'),

  popupDescription: function() {
    return this.get('note') || this.get('org');
  }.property('note', 'org')
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
