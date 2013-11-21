// Base map
var osmLayer = new ol.layer.Tile({source: new ol.source.OSM()});

// Census map layer
var wmsLayer = new ol.layer.Image({
  source: new ol.source.ImageWMS({
    url: '/geoserver/wms',
    params: {'LAYERS': 'g02_2013:g02_2013_normalized'}
  }),
  opacity: 0.6
});

// Map object
olMap = new ol.Map({
  target: 'map',
  renderer: ol.RendererHint.CANVAS,
  layers: [osmLayer, wmsLayer],
  view: new ol.View2D({
    center: [-10764594.0, 4523072.0],
    zoom: 5
  })
});

// Add behaviour to dropdown
var topics = document.getElementById('topics');
topics.onchange = function() {
  wmsLayer.getSource().updateParams({
    'viewparams': 'column:' + topics.options[topics.selectedIndex].value
  });
};

