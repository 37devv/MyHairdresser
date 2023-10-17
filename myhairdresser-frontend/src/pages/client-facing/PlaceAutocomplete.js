import React, { useState } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import debounce from 'lodash/debounce';

function PlaceAutocomplete() {
  const [options, setOptions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);  // Store the selected place details

  const loadSuggestions = (value) => {
    const sessionToken = new window.google.maps.places.AutocompleteSessionToken();
    const autocompleteService = new window.google.maps.places.AutocompleteService();

    autocompleteService.getPlacePredictions({
      input: value,
      sessionToken: sessionToken
    }, (predictions, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
        setOptions(predictions);
      }
    });
  }

  const fetchPlaceDetails = (placeId) => {
    const placesService = new window.google.maps.places.PlacesService(document.createElement('div'));
    placesService.getDetails({
      placeId: placeId,
      fields: ['geometry']
    }, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setSelectedPlace(place);
      }
    });
  }

  const debouncedLoadSuggestions = debounce(loadSuggestions, 300);

  const latitude = selectedPlace?.geometry?.location?.lat();
  const longitude = selectedPlace?.geometry?.location?.lng();

  return (
    <>
    <Autocomplete
      style={{ width: 300 }}
      onInputChange={(event, value) => {
        debouncedLoadSuggestions(value);
      }}
      onChange={(event, value) => {
        if (value) {
          fetchPlaceDetails(value.place_id);
        } else {
          setSelectedPlace(null);
        }
      }}
      options={options}
      getOptionLabel={(option) => option.description}
      renderInput={(params) => (
        <TextField {...params} label="Place" fullWidth />
      )}
    />
    {"lat"+ latitude}
    <br></br>
    {"long" + longitude}
    </>
    
  );
}

export default PlaceAutocomplete;
