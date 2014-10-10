import Ember from 'ember';
import ENV from 'planet-williams/config/environment';

export default Ember.ObjectController.extend({
  langs: ENV.APP.SUPPORTED_LANGS,

  currentLang: function() {
    return localStorage.lang || 'en';
  }.property(),

  currentLangChanged: function() {
    if (this.get('currentLang') !== localStorage.lang) {
      localStorage.lang = this.get('currentLang');

      // reload page to fetch lang file
      location.reload();
    }
  }.observes('currentLang')
});
