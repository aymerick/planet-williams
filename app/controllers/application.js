import Ember from 'ember';

export default Ember.ObjectController.extend({
  langs: [
    { id: "en", name: "English" },
    { id: "fr", name: "Français" }
  ],

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
