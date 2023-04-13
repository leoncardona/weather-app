import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps';
import React, { useRef, useEffect } from 'react';

function Map({ place }) {
    const API_KEY = process.env.REACT_APP_TOMTOM_API_KEY;
    const mapElement = useRef();

    useEffect(() => {
        tt.map({
            key: `${API_KEY}`,
            container: mapElement.current,
            center: [place.lng, place.lat],
            zoom: 9
        });
    }, [place, API_KEY]);

    return (
        <div ref={mapElement} className="mapa"></div>
    );
}

export default Map;