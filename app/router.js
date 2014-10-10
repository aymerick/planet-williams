import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('about');
  this.route('weekly');
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

  notifyGoogleAnalyticsEvent: function(category, action, label, value) {
    if (window.ga) {
      window.ga('send', 'event', category, action, label, value);
    }
  }
});

export default Router;
