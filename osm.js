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

var style = new ol.style.Style({
  symbolizers: [
    new ol.style.Icon({
      url: '../symbole/hund.png',
      yOffset: -22
    })
  ]
});

var vector = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: [
      new ol.Feature({
        name: 'Null Island',
        population: 4000,
        rainfall: 500,
        geometry: new ol.geom.Point([0, 0])
      })
    ]
  }),
  style: style
});



