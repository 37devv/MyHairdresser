import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function DistinctServicesAutocomplete(props) {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    // Call the API to fetch distinct services when the component mounts
    axios.get('http://localhost:8080/api/services/distinct')
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error("Error fetching distinct services:", error);
      });
  }, []);

  return (
    <div style={{ width: 300, marginTop: '20px', marginBottom: '20px' }}>
      <Autocomplete
        multiple
        id="distinct-services"
        options={services}
        getOptionLabel={(option) => option.name}
        value={selectedServices}
        onChange={(event, newValue) => {
          setSelectedServices(newValue);
          props.onChangeDistinctServicesAutocomplete(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Select Services" placeholder="Services" />
        )}
      />
    </div>
  );
}

export default DistinctServicesAutocomplete;
