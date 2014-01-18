// Map-Elemente

    // Raster-Layer
    
    var rasterlayer = new ol.layer.Tile({
      source: new ol.source.OSM()
    });
     
               
    // View
    
    var view = new ol.View2D({center: ol.proj.transform([16.37, 48.21], 'EPSG:4326', 'EPSG:3857'),
    zoom: 12,
    maxZoom: 18
    });
    
   


// eigentliche Map

var olmap = new ol.Map({
  layers: [rasterlayer],
  renderers: ol.RendererHints.CANVAS,
  target: 'map',
  view: view
});



 // Klickpunkte
    
    var commentLayer = new ol.layer.Image({
  source: new ol.source.ImageWMS({
    url: 'http://student.ifip.tuwien.ac.at/geoserver/g04_2013/wms?service=WMS&version=1.1.0&request=GetMap',
    params: {'LAYERS': 'g04_2013:comments'}
  })
});
olmap.addLayer(commentLayer);


//Geolocation
 
function geoloc(){    // damit �ber den Button aus aufrufbar

var geolocation = new ol.Geolocation();     
geolocation.bindTo('projection', view);
geolocation.setTracking(true); 
geolocation.on('change:position', function setPosition() {
  olmap.getView().setCenter(geolocation.getPosition())
});

// an Geolocation gebundener Marker

var marker = new ol.Overlay({
  positioning: ol.OverlayPositioning.CENTER_CENTER,
  element: document.getElementById('marker'),
  stopEvent: false
});
marker.bindTo('position', geolocation);
olmap.addOverlay(marker);
}

geoloc();



//Nominatim
  
 var form = document.forms[0];
form.onsubmit = function(auswerten) {
  var url = 'http://nominatim.openstreetmap.org/search?';
  var format = 'format=json';
  var wert = 'q=' + form.angabe.value;
  
  if (form.aut.checked == true) {
    var autwert = '&countrycodes=at';
  } 
  
  else {var autwert = ''}
   
  var finalurl = url + wert + '&' + format + autwert;
  
  var xhr = new XMLHttpRequest();
  xhr.open("GET", finalurl, true);
  xhr.onload = function() {
    var result = JSON.parse(xhr.responseText);
    if (result.length > 0) {
      var bbox = result[0].boundingbox;
      var coordinates = ol.proj.transform([parseFloat(bbox[0])],
          'EPSG:4326', 'EPSG:3857');
      
      var boundingbox = ol.proj.transform([parseFloat(bbox[2]),
          parseFloat(bbox[0]), parseFloat(bbox[3]), parseFloat(bbox[1])],
          'EPSG:4326', 'EPSG:3857');
      
      olmap.getView().fitExtent(boundingbox,olmap.getSize());
      
      
    }
  };
  xhr.send();
  auswerten.preventDefault();
};


// Add behaviour to the popup's close button
var popupContainer = document.getElementById('popup');
document.getElementById('popup-closer').onclick = function() {
  popupContainer.style.display = 'none';
  return false;
};


 
 
// Popup showing the position the user clicked

var popup = new ol.Overlay({
  element: document.getElementById('popup')
});
olmap.addOverlay(popup);

olmap.on('singleclick', function(evt) {
  popupContainer.style.display = 'block';
  var element = popup.getElement();
  var coordinate = evt.getCoordinate();
  lonlat = ol.proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326');
  var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
      coordinate, 'EPSG:3857', 'EPSG:4326'));

  $(element).popover('destroy');
  popup.setPosition(coordinate);
  // the keys are quoted to prevent renaming in ADVANCED_OPTIMIZATIONS mode.
  $(element).popover({
    'placement': 'left',
    'animation': false,
    'html': true,
    'content': '<p>The location you clicked was:</p><code>' + hdms + '</code>'
  });
  $(element).popover('show');
});




// Submit comment    

document.commentform.onsubmit = function(eval) {
  var url = 'b5_comment.php?comment=' + commentform.comment.value +
      '&longitude=' + lonlat[0] + '&latitude=' + lonlat[1];
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function() {
    commentLayer.getSource().updateParams({});
    alert(xhr.responseText);
    commentform.comment.value = '';
  };
  xhr.send();
  eval.preventDefault();

};
