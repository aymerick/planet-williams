import Ember from 'ember';

export default Ember.CollectionView.extend({
  viewName: 'legendView',
  contentBinding: 'controller',
  itemViewClass: 'pw-legend-item'
});
