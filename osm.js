var map = new ol.Map({
  layers: [
    new ol.layer.TileLayer({
      source: new ol.source.OSM()
    })
  ],
  renderers: ol.RendererHint.CANVAS,
  target: 'map',
  view: new ol.View2D({
    center: [0, 0],
    zoom: 2
  })
});


