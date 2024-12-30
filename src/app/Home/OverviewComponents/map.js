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
import { useDispatch, useSelector } from 'react-redux';
import toggleMarkerAction from '@/app/Redux/toggleMarkerAction';
import { Connect } from 'react-redux';


const locations = [
    { key: 1, location: { lat: -20.092848060837763, lng: 28.489651564037086 } },
    { key: 2, location: { lat: -20.093476785630237, lng: 28.489348801053524 } },
    { key: 3, location: { lat: -20.09349756698244, lng: 28.489306556261916 } },
    { key: 4, location: { lat: -20.093513310429245, lng: 28.489300521291685 } },
    { key: 5, location: { lat: -20.093532832301065, lng: 28.48928040472425 } },
    { key: 6, location: { lat: -20.09354605679351, lng: 28.48926632312705 } },

];

const PoiMarkers = ({ pois, color, toggleData }) => {
    const [markers, setMarkers] = useState({});
    const clusterer = useRef(null);
    const draggableBool = color == 'green' ? true : false;

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
        toggleData(true);
    });


    return (
        <>
            {pois.map((poi) => (
                <AdvancedMarker
                    key={poi.key}
                    position={poi.location}
                    clickable={true}
                    draggable={draggableBool}
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

    const [filterOption, setFilterOption] = useState("New Graves");
    const [dropDownDisplay, setDropDownDisplay] = useState("none");
    const [dateValue, setDateValue] = useState('')
    const [toggleMarkerAction, setToggleMarkerAction] = useState(false);
    console.log("toggleMarkerAction " + toggleMarkerAction)

    const [currentLocation, setCurrentLocation] = useState([{
        key: 7, location: { lat: -20.093476785630237, lng: 28.489348801053524 }
    }]);

    const [userLocation, setUserLocation] = useState([{
        key: 7, location: { lat: -20.093476785630237, lng: 28.489348801053524 }
    }]);

    const handleClick = (val) => {
        setFilterOption(val);
        //filter the markers and make the map pan to show 
        //where there are the most number  of markers
    }

    const filterBtnClick = () => {
        if (dropDownDisplay == "none") {
            setDropDownDisplay("block")
        } else {
            setDropDownDisplay("none")
        }
    }


    return (
        <>
            <APIProvider
                apiKey={'AIzaSyD-r--dhxYovA13Edk1gvre6ILosbCijTk'} onLoad={() => console.log('Maps API has loaded.')}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    <div className={styles.mapStyles}>
                        
                        <Map
                            defaultZoom={20}
                            defaultCenter={{ lat: -20.093476785630237, lng: 28.489348801053524 }}
                            mapId='2d7e4d007fa262a0'
                            onCameraChanged={(ev) =>
                                console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                            }>
                            <PoiMarkers pois={locations} color={'#FBBC04'} toggleData={setToggleMarkerAction}/>
                            <PoiMarkers pois={currentLocation} color={'#d3150b'} toggleData={setToggleMarkerAction} />
                            <PoiMarkers pois={userLocation} color={'green'} toggleData={setToggleMarkerAction} />
                        </Map>
                        <div className={styles.filterBar}>
                        
                            <div className={styles.dropdown}>
                                <button className={styles.dropbtn} onClick={filterBtnClick}>Filter: {filterOption}</button>
                                <div className={styles.dropdownContent} style={{ display: dropDownDisplay }}>
                                    <a href="#" onClick={() => handleClick("New Graves")}>New Graves</a>
                                    <a href="#" onClick={() => handleClick("Reserved")}>Reserved</a>
                                    <a href="#" onClick={() => handleClick("Occupied")}>Occupied</a>
                                </div>
                            </div>
                            <div >
                                <input type='date' name='time' value={dateValue} onChange={ev => setDateValue(ev.target.value)} className={styles.filterInputs} />
                            </div>
                        </div>
                    </div>
                </div>
            </APIProvider>
            { toggleMarkerAction ?  
                <div className={styles.markerContent} onClick={() => setToggleMarkerAction(false)}>
                    <div className={styles.loginForm} onClick={() => null}>
                        my data
                    </div>
                </div>
                : null
            }
        </>
    )
}

export default LocalMap;

// const mapStateToProps = (state) => ({
//     toggleMarkerAction: state.toggleMarkerAction
// });

// const mapDispatchToProps = (dispatch) => ({
//     showDetails: () => dispatch({ type: "SHOW_DETAILS" }),
//     addDetails: () => dispatch({ type: "ADD_DETAILS" })
// });

// export default Connect(mapStateToProps, mapDispatchToProps)(LocalMap);