export default {
  name: 'lang',

  initialize: function(/* container, app */) {
    /* Detect browser language */
    if (localStorage.lang === undefined) {
      var browserLang = window.navigator.userLanguage || window.navigator.language;
      if (browserLang) {
        browserLang = browserLang.split(/\-/)[0];

        if (PlanetWilliams.SUPPORTED_LANGS.mapBy('id').contains(browserLang)) {
          localStorage.lang = browserLang;
        }
      }
    }
  }
};
