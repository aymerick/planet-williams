var TileLayer = EmberLeaflet.TileLayer.extend({
	tileUrl: 'https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png',
	options: {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'examples.map-i86knfo3'
	}
});

export default EmberLeaflet.MapView.extend({
	center: L.latLng(48.112649, -1.678241),
	zoom: 3,
	options: { maxZoom: 19, minZoom: 2 },
	childLayers: [ TileLayer ]
});
