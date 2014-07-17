/* globals require */
import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(){
    var lang = localStorage.lang || 'en';

    return Ember.$.getScript("locale/" + lang + ".js").then(function(){
      Ember.I18n.translations = require('translations/' + lang)['default'];
    });
  }
});
