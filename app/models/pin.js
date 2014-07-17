import Ember from 'ember';

var Pin = Ember.Object.extend({
  displayTitle: function() {
    return this.get('title') || this.get('org');
  }.property('title', 'org'),

  displayDescription: function() {
    if (Ember.isNone(this.get('title'))) {
      return this.get('note');
    } else {
      return this.get('org');
    }
  }.property('note'),

  displayCountry: function() {
    return Ember.I18n.t("country." + this.get('adr.country-name'));
  }.property('adr.country-name')
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
