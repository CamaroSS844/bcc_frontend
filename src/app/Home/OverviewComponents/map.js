/**
 * Copyright 2024 Google LLC
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *    https://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
    APIProvider,
    AdvancedMarker,
    Map,
    MapCameraChangedEvent,
    useMap,
    Pin
} from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { Marker } from '@googlemaps/markerclusterer';
import { geolocated } from 'react-geolocated';
import styles from './../page.module.css';


const locations = [
    { key: 1, location: { lat: -20.092848060837763, lng: 28.489651564037086 } },
    { key: 2, location: { lat: -20.093476785630237, lng: 28.489348801053524 } },
    { key: 3, location: { lat: -20.09349756698244, lng: 28.489306556261916 } },
    { key: 4, location: { lat: -20.093513310429245, lng: 28.489300521291685 } },
    { key: 5, location: { lat: -20.093532832301065, lng: 28.48928040472425 } },
    { key: 6, location: { lat: -20.09354605679351, lng: 28.48926632312705 } },

];

const PoiMarkers = ({ pois, color }) => {
    const [markers, setMarkers] = useState({});
    const clusterer = useRef(null);

    const map = useMap();

    useEffect(() => {
        if (!map) return;
        if (!clusterer.current) {
            clusterer.current = new MarkerClusterer({ map });
        }
    }, [map]);

    useEffect(() => {
        clusterer.current?.clearMarkers();
        clusterer.current?.addMarkers(Object.values(markers));
    }, [markers]);

    const setMarkerRef = (marker, key) => {
        if (marker && markers[key]) return;
        if (!marker && !markers[key]) return;

        setMarkers(prev => {
            if (marker) {
                return { ...prev, [key]: marker };
            } else {
                const newMarkers = { ...prev };
                delete newMarkers[key];
                return newMarkers;
            }
        });
    };


    const handleClick = useCallback((ev) => {
        if (!map) return;
        if (!ev.latLng) return;
        console.log('marker clicked:', ev.latLng.toString());
        map.panTo(ev.latLng);
    });
    return (
        <>
            {pois.map((poi) => (
                <AdvancedMarker
                    key={poi.key}
                    position={poi.location}
                    clickable={true}
                    onClick={handleClick}
                    ref={marker => setMarkerRef(marker, poi.key)}
                >
                    <Pin background={color} glyphColor={'#000'} borderColor={'#000'} />
                </AdvancedMarker>
            ))}
        </>
    );
};


function LocalMap() {

    const [currentLocation, setCurrentLocation] = useState([{
        key: 7, location: { lat: -20.093, lng: 28.490 }
    }]);

    const [userLocation, setUserLocation] = useState([{
        key: 7, location: { lat: -20.093, lng: 28.590 }
    }]);

  // define the function that finds the users geolocation
  const getUserLocation = () => {
    // if geolocation is supported by the users browser
    if (navigator.geolocation) {
      // get the current users location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // save the geolocation coordinates in two variables
          const { latitude, longitude } = position.coords;
          // update the value of userlocation variable
          setUserLocation([{key: 8, location: { lat: latitude, lng: longitude }}]);
          console.log('User location:', latitude, longitude);
        },
        // if there was an error getting the users location
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
    // if geolocation is not supported by the users browser
    else {
      console.error('Geolocation is not supported by this browser.');
    }
  };


    return (
        <APIProvider
            apiKey={'AIzaSyD-r--dhxYovA13Edk1gvre6ILosbCijTk'} onLoad={() => console.log('Maps API has loaded.')}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1>Hello, world!</h1>
                <div className={styles.mapStyles}  style={{width: "900px", height: "500px"}}>
                    <Map
                        defaultZoom={20}
                        defaultCenter={{ lat: -20.093, lng: 28.490 }}
                        mapId='2d7e4d007fa262a0'
                        onCameraChanged={(ev) =>
                            console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                        }>
                        <PoiMarkers pois={locations} color={'#FBBC04'} />
                        <PoiMarkers pois={currentLocation} color={'#d3150b'} />
                        <PoiMarkers pois={userLocation} color={'green'} />
                    </Map>
                    <button onClick={() => setCurrentLocation([{ ...currentLocation[0], location: {lat: -20.093, lng: 28.490} }])}>
                        Set center
                    </button>
                    <button onClick={() => getUserLocation()}>
                        Get User Location
                    </button>
                </div>
            </div>
        </APIProvider>
    )
}


export default LocalMap;