import React from 'react'
import DistinctServicesAutocomplete from './DistinServicesAutocomplete'
import PlaceAutocomplete from './PlaceAutocomplete';
import Button from '@mui/material/Button';

export default function FilterHairsalonSearch() {

  const [latitude, setLatitude] = React.useState();
  const [longitude, setLongitude] = React.useState();
  const [address, setAddress] = React.useState(); 
  

  const handleSubmit = () => {

  }

  const onChangeCoordinates = (data) => {
      console.log("onChangeCoordinates "+data)
      
      setLatitude(data.lat);
    setLongitude(data.long);
  }

  const onChangeAdressName = (data) => {
    console.log("onChangeAdressName "+data)
    setAddress(data);
}

  const onChangeDistinctServicesAutocomplete = (data) => {
      console.log("onChangeDistinctServicesAutocomplete "+ data)
      services = data;
  }

  return (
    <div>
      {"Latitude: " + latitude}
      <br/>
      {"Longitude: " + longitude}
      <br/>
      {"Address: " + address}
      <br/>
      <PlaceAutocomplete
       onChangeCoordinates={onChangeCoordinates}
       onChangeAdressName={onChangeAdressName}/>
      <DistinctServicesAutocomplete onChangeDistinctServicesAutocomplete={onChangeDistinctServicesAutocomplete} />
      <Button variant="contained" onClick={handleSubmit}>Suchen</Button>
    </div>
  )
}
