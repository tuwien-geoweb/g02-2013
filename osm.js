var rasterlayer = new ol.layer.Tile({
    source: new ol.source.OSM()
});
 
var view = new ol.View2D({center: ol.proj.transform([16.37, 48.21], 'EPSG:4326', 'EPSG:3857'),
    zoom: 12,
    maxZoom: 18
});

var olmap = new ol.Map({
    layers: [rasterlayer],
    renderers: ol.RendererHints.CANVAS,
    target: 'map',
    view: view
});

var geolocation = new ol.Geolocation();
geolocation.bindTo('projection', view);
geolocation.on('change:position', function setPosition() {
  olmap.getView().setCenter(geolocation.getPosition())
});

var marker = new ol.Overlay({
  map: map,
  positioning: ol.OverlayPositioning.CENTER_CENTER,
  element: document.getElementById('marker'),
  stopEvent: false
});
// bind the marker position to the device location.
marker.bindTo('position', geolocation);
olmap.addOverlay(marker);

geolocation.on('error', function(error) {
  var info = document.getElementById('info');
  info.innerHTML = error.message;
  info.style.display = '';
});


$('#locate').click(function(event){
    geolocation.setTracking(true);
});


