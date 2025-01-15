import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
    AdvancedMarker,
    useMap,
    Pin
} from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';


export const PoiMarkers = ({ pois, color, toggleData, newLocation }) => {

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


    const handleClick = useCallback((ev, key) => {
        if (!map) return;
        if (!ev.latLng) return;
        console.log('marker clicked:', color);
        map.panTo(ev.latLng);
        if (color == 'green') {
            console.log("add new grave icon clicked");
            toggleData(true, key, "addNewGrave");
        } else {
            toggleData(true, key, "showDetails");
        }
    });

    const handleDragEnd = useCallback((ev) => {
        if (!ev.latLng) return;
        console.log('marker dragged:', ev.latLng.toJSON());
        newLocation([{ key: -2, id: -2, location: { latitude: ev.latLng.lat(), longitude: ev.latLng.lng() } }]);
    })


    return (
        <>
            {pois.map((poi) => (
                <AdvancedMarker
                    key={poi['id']}
                    position={{ lat: poi.location['latitude'], lng: poi.location['longitude'] }}
                    clickable={true}
                    draggable={draggableBool}
                    onDragEnd={(ev) => handleDragEnd(ev)}
                    onClick={ev => handleClick(ev, poi["key"])}
                    ref={marker => setMarkerRef(marker, poi['id'])}
                >
                    <Pin background={color} glyphColor={'#000'} borderColor={'#000'} />
                </AdvancedMarker>
            ))}
        </>
    );
};