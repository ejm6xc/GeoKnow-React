import React, { useCallback, useEffect, useRef } from 'react';
import L from 'leaflet';
import { Map, TileLayer } from 'react-leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';

import Sidebar from './components/sidebar/Sidebar';
import cemetery from './geoJson/cemetery.json';
import museums from './geoJson/museums.json';
import nationalParks from './geoJson/national parks.json';
import outdoorActivities from './geoJson/outdoor activities.json';
import trails from './geoJson/trails.json';


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function App() {
    const mapRef = useRef();
    const [filters, setFilters] = React.useState({
        price: null,
        weather: null,
        wheelchairAccessible: false,
        isOpenOnly: false,
    });

    const updateMap = useCallback((filters) => {
        setFilters(filters);

        const { leafletElement: map } = mapRef.current;

        // Remove old layers
        map.eachLayer((layer) => {
            if (layer instanceof L.GeoJSON) {
                map.removeLayer(layer);
            }
        });

        // Create new layers based on filters
        const parksGeoJson = createGeoJsonLayer(nationalParks, filters);
        const cemeteryGeoJson = createGeoJsonLayer(cemetery, filters);
        const museumsGeoJson = createGeoJsonLayer(museums, filters);
        const outdoorActivitiesGeoJson = createGeoJsonLayer(outdoorActivities, filters);
        const trailsGeoJson = createGeoJsonLayer(trails, filters);

        // Add new layers to the map
        parksGeoJson.addTo(map);
        cemeteryGeoJson.addTo(map);
        museumsGeoJson.addTo(map);
        outdoorActivitiesGeoJson.addTo(map);
        trailsGeoJson.addTo(map);

        //functions
        function createGeoJsonLayer(geoJsonData, filters) {
            return new L.GeoJSON(geoJsonData, {
                filter: function (feature) {
                    const { properties = {} } = feature;
                    const {
                        price_level,
                        wheelchair_accessible_entrance,
                        opening_hours
                    } = properties;

                    // Filter by price
                    if (filters.price !== null && price_level !== filters.price) {
                        return false;
                    }

                    // Filter by wheelchair accessibility
                    if (filters.wheelchairAccessible && !wheelchair_accessible_entrance) {
                        return false;
                    }

                    // Filter by open status
                    if (filters.isOpenOnly && !isOpenNow(opening_hours)) {
                        return false;
                    }

                    // Add more filter conditions here if needed

                    return true;
                },
                onEachFeature: function (feature, layer) {
                    const { properties = {} } = feature;
                    const {
                        adr_address,
                        name,
                        photos = [],
                        opening_hours,
                        formatted_phone_number,
                        price_level,
                        website,
                        wheelchair_accessible_entrance,
                        url,
                    } = properties;

                    let photo_reference = null;
                    if (photos && photos.length > 0) {
                        photo_reference = photos[0].photo_reference;
                    } else {
                        console.log("No photos available");
                    }
                    if (!name) return;

                    const isOpen = isOpenNow(opening_hours);
                    const openStatus = isOpen ? "Open" : "Closed";

                    layer.bindPopup(
                        `<h4>${name}</h4>` +
                        `${adr_address}<br/>` +
                        `${formatted_phone_number}<br/>` +
                        `Website: <a href="${website}">${name}</a><br/>` +
                        `<a href="${url}">View on Google Maps</a><br/>` +
                        `Wheelchair Accessible: ${replaceTrueFalseWithYesNo(
                            wheelchair_accessible_entrance
                        )}<br/>` +
                        "$".repeat(Number(price_level)) + `<br/>` +
                        `Status: ${openStatus}<br/>` +
                        `${createPhotoHtml(photo_reference)}`
                    );
                },
            });
        }
    }, []);

    useEffect(() => {
        const { current = {} } = mapRef;
        const { leafletElement: map } = current;
        if (!map) return;
        updateMap(filters);
    }, [filters, updateMap]);

    function replaceTrueFalseWithYesNo(bool) {
        if (bool === true) {
            return 'yes';
        } else if (bool === false) {
            return 'no';
        } else if (bool === undefined) {
            return 'unknown';
        } else {
            return bool;
        }
    }

    const isOpenNow = (opening_hours) => {
        if (!opening_hours || !opening_hours.periods) return false;

        const now = new Date();
        const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
        const currentTime = now.getHours() * 60 + now.getMinutes(); // current time in minutes

        const openingPeriods = opening_hours.periods.filter(
            (period) => period.open.day === dayOfWeek
        );

        for (const period of openingPeriods) {
            const openingTimeStr = period.open.time;
            const closingTimeStr = period.close.time;

            const openingTime = [
                parseInt(openingTimeStr.slice(0, 2), 10),
                parseInt(openingTimeStr.slice(2), 10),
            ];
            const closingTime = [
                parseInt(closingTimeStr.slice(0, 2), 10),
                parseInt(closingTimeStr.slice(2), 10),
            ];

            const openingTimeInMinutes = openingTime[0] * 60 + openingTime[1];
            const closingTimeInMinutes = closingTime[0] * 60 + closingTime[1];

            if (
                currentTime >= openingTimeInMinutes &&
                currentTime <= closingTimeInMinutes
            ) {
                return true;
            }
        }

        return false;
    };

    const createPhotoHtml = (photoReference) => {
        if (!photoReference) return '';

        const imageUrl = `${photoReference}`;
        return `<img src="${imageUrl}" alt="" style="width: 100%; max-height: 200px;" />`;
    };

    return (
        <div className="App">
            <Sidebar updateMap={updateMap} />
            <Map
                ref={mapRef}
                center={[38.62, -90.185]}
                zoom={12}
                maxZoom={17}
                minZoom={11}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
            </Map>
        </div>
    );
}

export default App;
