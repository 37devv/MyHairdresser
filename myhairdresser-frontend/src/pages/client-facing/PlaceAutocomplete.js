import React, { useState } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import debounce from 'lodash/debounce';

function PlaceAutocomplete(props) {
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
        console.log(place);
        setSelectedPlace(place);
        props.onChangeCoordinates({
          long: place.geometry?.location?.lng(),
          lat: place.geometry?.location?.lat(),
        })
      }
    });
  }

  const debouncedLoadSuggestions = debounce(loadSuggestions, 300);



  return (
    <>
    <Autocomplete
      style={{ width: 300 }}
      onInputChange={(event, value) => {
        debouncedLoadSuggestions(value);
      }}
      onChange={(event, value) => {
        if (value) {
          console.log(value);
          props.onChangeAdressName(value.description)
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
    {selectedPlace?.geometry?.location?.lat()}
    </>
    
  );
}

export default PlaceAutocomplete;
