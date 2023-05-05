import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Map, TileLayer } from 'react-leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';

import cemetery from './geoJson/cemetery.json';
import museums from './geoJson/museums.json';
import nationalParks from './geoJson/national parks.json';
import outdoorActivities from './geoJson/outdoor activities.json';
import trails from './geoJson/trails.json';
import Sidebar from "./components/Sidebar";

delete L.Icon.Default.prototype._getIconUrl;

// Importing images from locally stored assets to address a bug
// in CodeSandbox: https://github.com/codesandbox/codesandbox-client/issues/3845

 L.Icon.Default.mergeOptions({
   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
   iconUrl: require('leaflet/dist/images/marker-icon.png'),
   shadowUrl: require('leaflet/dist/images/marker-shadow.png')
 });

function App() {


  const mapRef = useRef();

  useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;

    if ( !map ) return;

    // Helper function to create GeoJSON layers
    const createGeoJsonLayer = (geoJsonData) => {
      return new L.GeoJSON(geoJsonData, {
        onEachFeature: (feature = {}, layer) => {
          const { properties = {} } = feature;
          const { adr_address, name, photos = [] } = properties;
          let photo_reference = null;
          if (photos && photos.length > 0) {
            photo_reference = photos[0].photo_reference;
            //console.log(photo_reference);
          } else {
            console.log('No photos available');
          }
          if (!name) return;

          layer.bindPopup(`<p>${name}</p><p>${adr_address}</p>${createPhotoHtml(photo_reference)}`);
        },
      });
    };

    // Helper function to create photo HTML
    const createPhotoHtml = (photoReference) => {
      if (!photoReference) return '';

      const imageUrl = `${photoReference}`;
      //console.log(imageUrl);
      return `<img src="${imageUrl}" alt="" style="width: 100%; max-height: 200px;" />`;
    };

    // Create GeoJSON layers
    const parksGeoJson = createGeoJsonLayer(nationalParks, createPhotoHtml);
    const cemeteryGeoJson = createGeoJsonLayer(cemetery, createPhotoHtml);
    const museumsGeoJson = createGeoJsonLayer(museums, createPhotoHtml);
    const outdoorActivitiesGeoJson = createGeoJsonLayer(outdoorActivities, createPhotoHtml);
    const trailsGeoJson = createGeoJsonLayer(trails, createPhotoHtml);

    // Add GeoJSON layers to the map
    parksGeoJson.addTo(map);
    cemeteryGeoJson.addTo(map);
    museumsGeoJson.addTo(map);
    outdoorActivitiesGeoJson.addTo(map);
    trailsGeoJson.addTo(map);
  }, [])

  return (

    <div className="App">
      <Sidebar/>
      <Map ref={mapRef} center={[38.62, -90.185]} zoom={12} maxZoom={17} minZoom={11}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
      </Map>
    </div>
  );
}

export default App;
