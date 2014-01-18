var osm = new ol.layer.Tile({
      source: new ol.source.OSM()
});

var view = new ol.View2D({center: ol.proj.transform([16.37, 48.21], 'EPSG:4326', 'EPSG:3857'),
    zoom: 12,
    maxZoom: 18
});
    
var olmap = new ol.Map({
    layers: [osm],
    renderers: ol.RendererHints.CANVAS,
    target: 'map',
    view: view
});

var geolocation = new ol.Geolocation();
geolocation.setTracking(true);
geolocation.bindTo('projection', view);

var marker = new ol.Overlay({
  positioning: ol.OverlayPositioning.CENTER_CENTER,
  element: document.getElementById('marker'),
  stopEvent: false
});
marker.bindTo('position', geolocation);
olmap.addOverlay(marker);
}

geolocation.on('error', function(error) {
  var info = document.getElementById('info');
  info.innerHTML = error.message;
  info.style.display = '';
});




