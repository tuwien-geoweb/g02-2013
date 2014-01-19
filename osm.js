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

geolocation.on('error', function(error) {
  var info = document.getElementById('info');
  info.innerHTML = error.message;
  info.style.display = '';
});


$('#locate').click(function(event){
    geolocation.setTracking(true);
    olmap.addOverlay(marker);
    $("#stopped").fadeToggle();
    $("#tracking").fadeToggle();
    event.preventDefault();
});

$('#stop').click(function(event){
    geolocation.setTracking(false);
    olmap.removeOverlay(marker);
    $("#stopped").fadeToggle();
    $("#tracking").fadeToggle();
    event.preventDefault();
});

$('#search').click(function(event){
    geolocation.setTracking(false);
    $('#tracking').hide();
    $('#stopped').hide();
    olmap.removeOverlay(marker);
});


// Submit query to Nominatim and zoom map to the result's extent
var form = document.forms[0];
form.onsubmit = function(evt) {
  var url = 'http://nominatim.openstreetmap.org/search?format=json&q=';
  url += form.query.value;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function() {
    var result = JSON.parse(xhr.responseText);
    if (result.length > 0) {
      var bbox = result[0].boundingbox;
      olmap.getView().fitExtent(ol.proj.transform([parseFloat(bbox[2]),
          parseFloat(bbox[0]), parseFloat(bbox[3]), parseFloat(bbox[1])],
          'EPSG:4326', 'EPSG:3857'), olmap.getSize());
    }
  };
  xhr.send();
  evt.preventDefault();
};


