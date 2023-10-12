import React, { useState, useEffect } from 'react';

function NearbySearch({ lat, lng, type }) {
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (lat && lng) {
            const center = new window.google.maps.LatLng(lat, lng);
            const map = new window.google.maps.Map(document.createElement('div')); // Dummy map element
            const service = new window.google.maps.places.PlacesService(map);

            const request = {
                location: center,
                radius: '500',  // Search within 500m radius. Adjust as needed.
                type: type      // e.g. 'restaurant'
            };

            service.nearbySearch(request, (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    setResults(results);
                }
            });
        }
    }, [lat, lng, type]);

    return (
        <div>
            {results.map(place => (
                <div key={place.place_id}>
                    <h3>{place.name}</h3>
                    <p>{place.vicinity}</p>
                </div>
            ))}
        </div>
    );
}

export default NearbySearch;
