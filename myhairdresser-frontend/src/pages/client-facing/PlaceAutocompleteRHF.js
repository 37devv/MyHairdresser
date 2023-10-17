import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Autocomplete } from '@mui/material';
import debounce from 'lodash/debounce';
import { updateLocation } from 'store/reducers/addHairdresser'; // Replace 'path-to-your-slice-file' with the actual path to your slice file.

function PlaceAutocompleteRHF({ field, fieldState }) {
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();

  const handlePlaceSelect = (description) => {
    const geocoder = new window.google.maps.Geocoder();
    
    geocoder.geocode({ 'address': description }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const latitude = results[0].geometry.location.lat();
        const longitude = results[0].geometry.location.lng();
        
        // Dispatch the update to Redux state
        dispatch(updateLocation({ latitude, longitude }));
      }
    });
  }

  const loadSuggestions = (value) => {
    const sessionToken = new window.google.maps.places.AutocompleteSessionToken();
    const autocompleteService = new window.google.maps.places.AutocompleteService();

    autocompleteService.getPlacePredictions({
      input: value,
      sessionToken: sessionToken
    }, (predictions, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
        setOptions(predictions.map(prediction => prediction.description));
      }
    });
  }

  const debouncedLoadSuggestions = debounce(loadSuggestions, 300);

  return (
    <Autocomplete
      value={field.value}
      onChange={(event, newValue) => {
        field.onChange(newValue);
        handlePlaceSelect(newValue); // Call the handlePlaceSelect function when a place is selected
      }}
      onInputChange={(event, value) => {
        debouncedLoadSuggestions(value);
      }}
      options={options}
      renderInput={(params) => (
        <TextField {...params} label="Place" fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
      )}
    />
  );
}

export default PlaceAutocompleteRHF;
