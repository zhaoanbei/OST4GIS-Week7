/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [40.000, -75.1090],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

//var getData = $.ajax('')
//var parseData = JSON.parse(getData)
//L.geoJSON(parseData, {
//    style: Polygon
//}).addTo(map);



/*## Task 4

Let's make something happen when a user clicks on a feature. Change the "Day of
Week" in the sidebar to show the day of the week of garbage removal. Make sure
to display the full name (display "Monday" instead of "MON").

We will write everything we want to happen to each feature inside of the
following (aptly named) function:

var eachFeatureFunction = function(feature, layer) {
  ...
});

You'll notice that inside of that block of code we have a second block of code:

layer.on('click', function (e) {
  ...
})

That part sets up a click event on each feature. Any code inside that second
block of code will happen each time a feature is clicked.


## Task 6 (Stretch goal)

Let's associate the leaflet ID (we can use this to look up a leaflet layer) with
our HTML element. Try to use the `getLayerId` method of `L.FeatureGroup` and
`L.LayerGroup` (on myFeatureGroup) below.
With it, add the Leaflet ID to the information provided on the left.

## Task 7 (Stretch Goal)

Use fitBounds (http://leafletjs.com/reference.html#map-fitbounds) to zoom in and
center the map on one particular feature. To find the bounds for a feature, use
event.target.getBounds() inside of the layer.on function.

## Task 8 (Stretch Goal)

Add a "Close" or "X" button to the top right of your sidebar. When when the
button is clicked, call a function closeResults that performs the opposite
processes as showResults, returning the user to the original state of the
application.

## Task 9 (Stretch Goal)

Use Underscore to perform analysis on this GeoJSON data: which day of
the week was the most common for garbage removal? Update the original state
of the application to report this information.

===================== */

var dataset = "https://raw.githubusercontent.com/CPLN-692-401/datasets/master/geojson/philadelphia-garbage-collection-boundaries.geojson"
var featureGroup;
function color(d){
  return d === "MON" ? '#ffc25a' :
  d === "TUE" ? '#ffdfa8' :
  d === "WED" ? '#ff9e46' :
  d === "THU" ? '#e45f24' :
  '#4aa3ca' ;
}

function pop(d) {
    return d === "MON"  ? 'Monday' :
           d === "TUE"  ? 'Tuesday' :
           d === "WED"  ? 'Wednesday' :
           d === "THU"  ? 'Thursday' :
           d === "FRI"  ? 'Friday' :
                          'No Idea' ;
}

var myStyle = function(feature) {
  return {
    fillColor: color(feature.properties.COLLDAY),
    weight: 2,
    opacity: 0.3,
    color: 'white',
    dashArray: '1',
    fillOpacity: 0.7

  }
  /*if (feature.properties.COLLDAY == "MON") return {fillColor: 'red'}
  else if (feature.properties.COLLDAY == "TUE") return {fillColor: 'yellow'}
  else if (feature.properties.COLLDAY == "WED") return {fillColor: 'green'}
  else if (feature.properties.COLLDAY == "THU") return {fillColor: 'orange'}
  else if (feature.properties.COLLDAY == "FRI") return {fillColor: 'black'}
  else if (feature.properties.COLLDAY == "SAT") return {fillColor: 'blue'}
  else if (feature.properties.COLLDAY == "SUN") return {fillColor: 'white'}*/
  }


var showResults = function() {
  /* =====================
  This function uses some jQuery methods that may be new. $(element).hide()
  will add the CSS "display: none" to the element, effectively removing it
  from the page. $(element).show() removes "display: none" from an element,
  returning it to the page. You don't need to change this part.
  ===================== */
  // => <div id="intro" css="display: none">
  $('#intro').hide();
  // => <div id="results">
  $('#results').show();
};


var eachFeatureFunction = function(layer) {
  layer.on('click', function (event) {
    /*switch (event.properties.COLLDAY) {
        case 'MON': $("#day-of-week").text("Monday");
        break;
        case 'TUE': $("#day-of-week").text("Tuesday");
        break;
        case 'WED': $("#day-of-week").text("Wednesday");
        break;
        case 'THU': $("#day-of-week").text("Thursday");
        break;
        case 'FRI': $("#day-of-week").text("Friday");*/
    console.log(layer.feature);
    $('.day-of-week').text(pop(features.properties.COLLDAY));
    showResults();
  });
};

var myFilter = function(feature) {
  return feature.properties.COLLDAY!== " ";
};

$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup = L.geoJson(parsedData, {
      style: myStyle,
      filter: myFilter
    }).addTo(map);

    // quite similar to _.each
    featureGroup.eachLayer(eachFeatureFunction);
  });
});
