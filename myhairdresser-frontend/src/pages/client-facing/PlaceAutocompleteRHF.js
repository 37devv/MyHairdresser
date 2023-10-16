import React, {  useState } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import debounce from 'lodash/debounce';

function PlaceAutocompleteRHF({ field, fieldState }) {
  const [options, setOptions] = useState([]);
  

  const loadSuggestions = (value) => {
    // Create a new session token. 
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

  // Debounce the loadSuggestions function so it waits 300ms after the last call to execute.
  const debouncedLoadSuggestions = debounce(loadSuggestions, 300);

  return (
    <Autocomplete
      value={field.value}
      onChange={(event, newValue) => {
        field.onChange(newValue);
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
