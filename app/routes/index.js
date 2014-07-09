import Ember from 'ember';
import Pin from '../models/pin';

export default Ember.Route.extend({
  model: function() {
    return Pin.all();
  }
});
