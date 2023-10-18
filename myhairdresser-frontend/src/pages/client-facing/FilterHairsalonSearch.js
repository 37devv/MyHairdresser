import React from 'react'
import DistinctServicesAutocomplete from './DistinServicesAutocomplete'
import PlaceAutocomplete from './PlaceAutocomplete';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function FilterHairsalonSearch() {

  const [latitude, setLatitude] = React.useState();
  const [longitude, setLongitude] = React.useState();
  const [address, setAddress] = React.useState();
  const [selectedServices, setSelectedServices] = React.useState();

  const handleSubmit = async () => {


    // Extracting the names
    const serviceNames = selectedServices.map(service => service.name);

    try {
      const response = await axios.get('http://localhost:8080/api/hairsalons/search', {
        params: {
          latitude: latitude,
          longitude: longitude,
          selectedServices: serviceNames.join(',')
        }
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error calling the API", error);
    }

  }

  const onChangeCoordinates = (data) => {
    console.log("onChangeCoordinates " + data)

    setLatitude(data.lat);
    setLongitude(data.long);
  }

  const onChangeAdressName = (data) => {
    console.log("onChangeAdressName " + data)
    setAddress(data);
  }

  const onChangeDistinctServicesAutocomplete = (data) => {
    console.log("onChangeDistinctServicesAutocomplete " + data)
    setSelectedServices(data);
  }

  return (
    <div>
      {"Latitude: " + latitude}
      <br />
      {"Longitude: " + longitude}
      <br />
      {"Address: " + address}
      <br />
      {"selectedServices: " + JSON.stringify(selectedServices)}
      <br />
      <PlaceAutocomplete
        onChangeCoordinates={onChangeCoordinates}
        onChangeAdressName={onChangeAdressName} />
      <DistinctServicesAutocomplete onChangeDistinctServicesAutocomplete={onChangeDistinctServicesAutocomplete} />
      <Button variant="contained" onClick={handleSubmit}>Suchen</Button>
    </div>
  )
}
