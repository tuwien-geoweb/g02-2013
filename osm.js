var osm = new ol.layer.Tile({
      source: new ol.source.OSM()
    });

var view = new ol.View2D({center: ol.proj.transform([16.37, 48.21], 'EPSG:4326', 'EPSG:3857'),
    zoom: 12,
    maxZoom: 18
    });

var map = new ol.Map({
  layers: [osm],
  renderers: ol.RendererHints.CANVAS,
  target: 'map',
  view: view
});

var geolocation = new ol.Geolocation();
geolocation.bindTo('projection', map.getView());
geolocation.bindTo('position', map.getView(), 'center');
geolocation.setTracking(true);

var marker = new OpenLayers.Layer.Markers( "marker" );

var size = new OpenLayers.Size(21,25);
var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
var icon = new OpenLayers.Icon('http://www.openlayers.org/dev/img/marker.png', size, offset);

map.addOverlay(marker);
      marker.bindTo('position', geolocation);
            view.setCenter(ol.proj.transform([Number(longitude),Number(latitude)], 'EPSG:4326', 'EPSG:3857'));
            view.setZoom(16);


