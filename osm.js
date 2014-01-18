var osmLayer = new ol.layer.Tile({source: new ol.source.OSM()});

olMap = new ol.Map({
  target: 'map',
  renderer: ol.RendererHint.CANVAS,
  layers: [osmLayer],
  view: new ol.View2D({
    center: ol.proj.transform([16.37, 48.21], 'EPSG:4326', 'EPSG:3857'),
    zoom: 11,
    maxZoom: 18
  })
});


