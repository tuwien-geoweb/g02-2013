// Base map
var osmLayer = new ol.layer.Tile({source: new ol.source.OSM()});

// Census map layer
var wmsLayer = new ol.layer.Image({
  source: new ol.source.ImageWMS({
    url: '/geoserver/wms',
    params: {'LAYERS': 'g02_2013:g02_normalized_data'}
  }),
  opacity: 0.6
});

var kindergarten1 = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'http://student.ifip.tuwien.ac.at/geoserver/g02_2013/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=g02_2013:KINDERGARTENOGD&outputFormat=json',
    parser: new ol.parser.GeoJSON()
  }),
            style: new ol.style.Style({
                     symbolizers: [
               new ol.style.Icon({
                        url: '../../symbole/kindergarten.png',
                 })
                  ]
            })
});

var citybike = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'http://student.ifip.tuwien.ac.at/geoserver/g02_2013/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=g02_2013:CITYBIKEOGD1&outputFormat=json',
    parser: new ol.parser.GeoJSON()
  }),
            style: new ol.style.Style({
                     symbolizers: [
               new ol.style.Icon({
                        url: '../../symbole/city.png',
                 })
                  ]
            })
}); 

var hundezone = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'http://student.ifip.tuwien.ac.at/geoserver/g02_2013/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=g02_2013:HUNDEZONEOGD&outputFormat=json',
    parser: new ol.parser.GeoJSON()
  }),
            style: new ol.style.Style({
                     symbolizers: [
               new ol.style.Icon({
                        url: '../../symbole/hund.png',
                 })
                  ]
            })
}); 

var schulen = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'http://student.ifip.tuwien.ac.at/geoserver/g02_2013/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=g02_2013:SCHULEOGD&outputFormat=json',
    parser: new ol.parser.GeoJSON()
  }),
            style: new ol.style.Style({
                     symbolizers: [
               new ol.style.Icon({
                        url: '../../symbole/schule.png',
                 })
                  ]
            })
});

var schwimmbad = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'http://student.ifip.tuwien.ac.at/geoserver/g02_2013/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=g02_2013:SCHWIMMBADOGD&outputFormat=json',
    parser: new ol.parser.GeoJSON()
  }),
            style: new ol.style.Style({
                     symbolizers: [
               new ol.style.Icon({
                        url: '../../symbole/schwimm.png',
                 })
                  ]
            })
}); 

var spielplatz = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'http://student.ifip.tuwien.ac.at/geoserver/g02_2013/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=g02_2013:SPIELPLATZOGD&outputFormat=json',
    parser: new ol.parser.GeoJSON()
  }),
            style: new ol.style.Style({
                     symbolizers: [
               new ol.style.Icon({
                        url: '../../symbole/platz.png',
                 })
                  ]
            })
}); 

var park = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'http://student.ifip.tuwien.ac.at/geoserver/g02_2013/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=g02_2013:PARKANLAGEOGD&outputFormat=json',
    parser: new ol.parser.GeoJSON()
  }),
            style: new ol.style.Style({
                     symbolizers: [
               new ol.style.Icon({
                        url: '../../symbole/parks.png',
                 })
                  ]
            })
});

var markt = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'http://student.ifip.tuwien.ac.at/geoserver/g02_2013/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=g02_2013:MAERKTEOGD&outputFormat=json',
    parser: new ol.parser.GeoJSON()
  }),
            style: new ol.style.Style({
                     symbolizers: [
               new ol.style.Icon({
                        url: '../../symbole/korb.png',
                 })
                  ]
            })
}); 

var ubahn = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'http://student.ifip.tuwien.ac.at/geoserver/g02_2013/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=g02_2013:UBAHNHALTOGD&outputFormat=json',
    parser: new ol.parser.GeoJSON()
  }),
            style: new ol.style.Style({
                     symbolizers: [
               new ol.style.Icon({
                        url: '../../symbole/u.png',
                 })
                  ]
            })
}); 


// Map object
olMap = new ol.Map({
  target: 'map',
  renderer: ol.RendererHint.CANVAS,
  layers: [osmLayer, wmsLayer],
  view: new ol.View2D({
    center: ol.proj.transform([16.37, 48.21], 'EPSG:4326', 'EPSG:3857'),
    zoom: 11,
    maxZoom: 18
  })
});

// Add behaviour to dropdown
var topics = document.getElementById('topics');
topics.onchange = function() {
  wmsLayer.getSource().updateParams({
    'viewparams': 'column:' + topics.options[topics.selectedIndex].value
  });
};

// Load variables into dropdown
var xhr = new XMLHttpRequest();
xhr.open("GET", "data/datadict.txt");
xhr.onload = function() {
  var lines = xhr.responseText.split('\n');
  
// We start at line 3 - line 1 is column names, line 2 is not a variable
  for (var i = 2, ii = lines.length; i < ii; ++i) {
    var option = document.createElement('option');
    option.value = lines[i].substr(0, 10).trim();
    option.innerHTML = lines[i].substr(10, 105).trim();
    topics.appendChild(option);
  }
};
xhr.send();

// Add behaviour to the popup's close button
var popupContainer = document.getElementById('popup');
document.getElementById('popup-closer').onclick = function() {
  popupContainer.style.display = 'none';
  return false;
};

// Create an ol.Overlay with the popup so it is anchored to the map
var popup = new ol.Overlay({
  element: popupContainer
});
olMap.addOverlay(popup);

// Handle map clicks to send a GetFeatureInfo request and open the popup
olMap.on('singleclick', function(evt) {
  olMap.getFeatureInfo({
    pixel: evt.getPixel(),
    success: function (info) {
      var mapCoordinate = evt.getCoordinate();
      popup.setPosition(mapCoordinate);
      document.getElementById('popup-content').innerHTML = info.join('');
      popupContainer.style.display = 'block';
    }
  });
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
      olMap.getView().fitExtent(ol.proj.transform([parseFloat(bbox[2]),
          parseFloat(bbox[0]), parseFloat(bbox[3]), parseFloat(bbox[1])],
          'EPSG:4326', 'EPSG:3857'), olMap.getSize());
    }
  };
  xhr.send();
  evt.preventDefault();
};

  
document.getElementById('kindergarten').onclick = function(e){
  if(this.checked==1){
    olMap.addLayer(kindergarten1);
  }else{
    olMap.removeLayer(kindergarten1);
  }
};

document.getElementById('citybike').onclick = function(e){
  if(this.checked==1){
    olMap.addLayer(citybike);
  }else{
    olMap.removeLayer(citybike);
  }
};

document.getElementById('hundezone').onclick = function(e){
  if(this.checked==1){
    olMap.addLayer(hundezone);
  }else{
    olMap.removeLayer(hundezone);
  }
};

document.getElementById('schulen').onclick = function(e){
  if(this.checked==1){
    olMap.addLayer(schulen);
  }else{
    olMap.removeLayer(schulen);
  }
};

document.getElementById('schwimmbad').onclick = function(e){
  if(this.checked==1){
    olMap.addLayer(schwimmbad);
  }else{
    olMap.removeLayer(schwimmbad);
  }
};

document.getElementById('spielplatz').onclick = function(e){
  if(this.checked==1){
    olMap.addLayer(spielplatz);
  }else{
    olMap.removeLayer(spielplatz);
  }
};

document.getElementById('park').onclick = function(e){
  if(this.checked==1){
    olMap.addLayer(park);
  }else{
    olMap.removeLayer(park);
  }
};

document.getElementById('markt').onclick = function(e){
  if(this.checked==1){
    olMap.addLayer(markt);
  }else{
    olMap.removeLayer(markt);
  }
};

document.getElementById('ubahn').onclick = function(e){
  if(this.checked==1){
    olMap.addLayer(ubahn);
  }else{
    olMap.removeLayer(ubahn);
  }
};

markers = new OpenLayers.Layer.Markers( "Markers" );
markers.id = "Markers";
map.addLayer(markers);

map.events.register("singleclick", map, function(e) {
      //var position = this.events.getMousePosition(e);
      var position = map.getLonLatFromPixel(e.xy);
      var size = new OpenLayers.Size(21,25);
   var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
   var icon = new OpenLayers.Icon('http://www.openlayers.org/dev/img/marker.png', size, offset);   
   var markerslayer = map.getLayer('Markers');

   markerslayer.addMarker(new OpenLayers.Marker(position,icon));

   });
