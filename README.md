# homework12
leaflet-challenge

### Earthquake Visualization Map ###

This project visualizes global earthquake data from the United States Geological Survey (USGS) in an interactive map using Leaflet and D3.js. The map shows recent earthquake activity, where each earthquake is represented by a circle marker. The size of the marker is proportional to the earthquake's magnitude, and the color of the marker represents the depth of the earthquake

## Features ##

Earthquake Data: Data is fetched from the USGS GeoJSON Feed.
Color-coded Markers: Earthquake markers are color-coded based on the depth of the earthquake.
Sized Markers: The size of the markers is proportional to the magnitude of the earthquake.
Popup Information: Clicking on any earthquake marker displays detailed information, including:
Magnitude
Depth
Location
Time of occurrence
Legend: A legend is included to help interpret the depth of the earthquakes based on their color.

## Data Source ##

The earthquake data used for this visualization comes from the USGS Earthquake Feed, which provides real-time earthquake information worldwide. The data is fetched via a GeoJSON format and displayed on the map in near-real-time.

## Libraries Used ##

Leaflet.js: A leading open-source JavaScript library for mobile-friendly interactive maps.
Map tiles are sourced from Stadia Maps and OpenTopoMap.
D3.js: A JavaScript library for manipulating documents based on data, used here to fetch and process the GeoJSON earthquake data.
