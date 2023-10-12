import React from 'react'
import DistinctServicesAutocomplete from './DistinServicesAutocomplete'
import PlaceAutocomplete from './PlaceAutocomplete';
import Button from '@mui/material/Button';

export default function FilterHairsalonSearch() {
  return (
    <div>
        <PlaceAutocomplete />
        <DistinctServicesAutocomplete/>
        <Button variant="contained">Suchen</Button>
    </div>
  )
}
