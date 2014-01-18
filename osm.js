
var map = new ol.Map({
  layers: [
    new ol.layer.TileLayer({
      source: new ol.source.OSM()
    })
  ],
  renderer: ol.RendererHint.CANVAS,
  target: 'map',
  view: new ol.View2D({
    center: ol.proj.transform([16.37, 48.21], 'EPSG:4326', 'EPSG:3857'),
    zoom: 11
  })
});

var geolocation = new ol.Geolocation();
geolocation.bindTo('projection', map.getView());

var marker = new ol.Overlay({
  map: map,
  element: /** @type {Element} */ ($('<i/>').addClass('icon-flag').get(0))
});
// bind the marker position to the device location.
marker.bindTo('position', geolocation);

geolocation.on('change:accuracy', function() {
  $(marker.getElement()).tooltip({
    title: this.getAccuracy() + 'm from this point'
  });
});
geolocation.on('error', function(error) {
  var info = document.getElementById('info');
  info.innerHTML = error.message;
  info.style.display = '';
});


$('#locate').click(function() {
  geolocation.setTracking(true);
});


