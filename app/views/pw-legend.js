import Ember from 'ember';

export default Ember.CollectionView.extend({
  contentBinding: 'controller',
  itemViewClass: 'pw-legend-item'
});
