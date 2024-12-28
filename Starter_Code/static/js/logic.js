// Initialize the map
const map = L.map('map').setView([45, -30], 2);

// Create base layers for the map
let baseLayers = {
    "StreetMap": L.tileLayer('https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&hl={language}', {
      attribution: 'Map data &copy;2024 Google',
      subdomains: '0123',
      maxZoom: 22,
      language: 'en'
    }),
    "OpenTopoMap": L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.opentopomap.org/copyright">OpenTopoMap</a> contributors',
      maxZoom: 17,
      minZoom: 3
    })
  };

// Add the default map (Stadia Outdoors) to the map
baseLayers["StreetMap"].addTo(map);

// Add layer control to switch between layers
L.control.layers(baseLayers).addTo(map);

// Function to determine the color based on depth
function getColor(depth) {
    if (depth >= -10 && depth <= 10) return "#A3F600";  
    else if (depth > 10 && depth <= 30) return "#DCF400";  
    else if (depth > 30 && depth <= 50) return "#F7DB11";  
    else if (depth > 50 && depth <= 70) return "#FDB72A";  
    else if (depth > 70 && depth <= 90) return "#FCA35D";  
    else return "#FF5F65";  
}

// Function to determine the size of the marker based on magnitude
function getSize(magnitude) {
    return magnitude * 3; // Magnitude multiplied by a constant to scale the size
}

// Perform an API call to the USGS GeoJSON Feed - All Earthquakes in the last 7 Days
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    console.log(data)

    // Loop through each earthquake in the data
    data.features.forEach(function(earthquake) {
        let coordinates = earthquake.geometry.coordinates;
        let latitude = coordinates[1];
        let longitude = coordinates[0];
        let depth = coordinates[2];
        let magnitude = earthquake.properties.mag;
        let place = earthquake.properties.place;
        let time = new Date(earthquake.properties.time).toLocaleString();

        // Create a circle marker for each earthquake
        L.circleMarker([latitude, longitude], {
            radius: getSize(magnitude), // Size based on magnitude
            color: getColor(depth), // Color based on depth
            weight: 1,
            opacity: 1,
            fillOpacity: 0.7
        })
        .bindPopup(`
            <h3>Location: ${place}</h3>
             <p>Coordinates: ${latitude}:${longitude}</p>
            <p>Magnitude: ${magnitude}</p>
            <p>Depth: ${depth} km</p>
        `)
        .addTo(map);
    });

// Create a legend for depth and color
var legend = L.control({position: 'bottomright'});

legend.onAdd = function() {
    var div = L.DomUtil.create('div', 'info legend');
    
    // Add some styles for the legend container
    div.style.backgroundColor = 'white';  // Set background to white
    div.style.padding = '10px';            // Add padding inside the box
    div.style.borderRadius = '5px';        // Round the corners a bit
    div.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)'; // Add a subtle shadow to make it stand out

    var depths = [-10, 10, 30, 50, 70, 90]; // Upper bounds for depth ranges
    var colors = ["#A3F600", "#DCF400", "#F7DB11", "#FDB72A", "#FCA35D", "#FF5F65"];

    // Loop through the depth ranges and colors
    for (var i = 0; i < depths.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '; width: 20px; height: 20px; display: inline-block; margin-right: 5px;"></i> ' +
            (depths[i] <= -10 ? depths[i] : depths[i] + ' to ' + (depths[i + 1] ? depths[i + 1] : '+')) + ' km' + '<br>';
    }
    
    return div;
};

legend.addTo(map);


});
