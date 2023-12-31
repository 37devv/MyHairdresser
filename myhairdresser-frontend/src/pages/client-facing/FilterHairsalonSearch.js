import React from 'react'
import DistinctServicesAutocomplete from './DistinServicesAutocomplete'
import PlaceAutocomplete from './PlaceAutocomplete';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FilterHairsalonSearch() {


  const [latitude, setLatitude] = React.useState();
  const [longitude, setLongitude] = React.useState();
  const [address, setAddress] = React.useState();
  const [selectedServices, setSelectedServices] = React.useState();

  const isButtonDisabled = !address || !selectedServices || selectedServices.length === 0;

  const navigate = useNavigate();

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

      navigate(`/client/searchresults?latitude=${latitude}&longitude=${longitude}&services=${serviceNames.join(',')}`);

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

      <PlaceAutocomplete
        onChangeCoordinates={onChangeCoordinates}
        onChangeAdressName={onChangeAdressName} />
      <DistinctServicesAutocomplete onChangeDistinctServicesAutocomplete={onChangeDistinctServicesAutocomplete} />
      <Button variant="contained" onClick={handleSubmit} disabled={isButtonDisabled}>Suchen</Button>
    </div>
  )
}
