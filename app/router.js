import Ember from 'ember';

var Router = Ember.Router.extend({
  location: PlanetWilliamsENV.locationType
});

Router.map(function() {
  this.route('about');
});

// Cf. http://emberjs.com/guides/cookbook/helpers_and_components/adding_google_analytics_tracking/
Router.reopen({
  notifyGoogleAnalyticsPageView: function() {
    if (window.ga) {
      return window.ga('send', 'pageview', {
        'page': this.get('url'),
        'title': this.get('url')
      });
    }
  }.on('didTransition'),
});

export default Router;
