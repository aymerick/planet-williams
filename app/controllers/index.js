import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: [ 'displayCountry', 'displayTitle' ]
});