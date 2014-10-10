import ENV from 'planet-williams/config/environment';

export default {
  name: 'lang',

  initialize: function(/* container, app */) {
    /* Detect browser language */
    if (localStorage.lang === undefined) {
      var browserLang = window.navigator.userLanguage || window.navigator.language;
      if (browserLang) {
        browserLang = browserLang.split(/\-/)[0];

        if (ENV.APP.SUPPORTED_LANGS.mapBy('id').contains(browserLang)) {
          localStorage.lang = browserLang;
        }
      }
    }
  }
};
