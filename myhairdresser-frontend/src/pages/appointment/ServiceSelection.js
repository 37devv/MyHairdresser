import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function ServiceSelection({ services, handleServiceIdChange }) {

  const [selectedServices, setSelectedServices] = React.useState([]);
  const [selectedServiceIds, setSelectedServiceIds] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [totalDuration, setTotalDuration] = React.useState(0);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setSelectedServices(value);

    // Extract IDs of selected services
    const selectedIds = value.map((service) => service.id);
    setSelectedServiceIds(selectedIds);

    // Calculate the total price and duration of selected services
    const selectedServicesTotalPrice = services
      .filter((service) => selectedIds.includes(service.id))
      .reduce((sum, service) => sum + service.price, 0);

    const selectedServicesTotalDuration = services
      .filter((service) => selectedIds.includes(service.id))
      .reduce((sum, service) => sum + parseDuration(service.duration), 0);

    setTotalPrice(selectedServicesTotalPrice);
    setTotalDuration(selectedServicesTotalDuration);

    
    //Send to parent component to retrieve id's
    handleServiceIdChange(selectedIds);
  };

  // Function to parse ISO 8601 duration to minutes
  const parseDuration = (durationString) => {
    const matches = durationString.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = parseInt(matches[1]) || 0;
    const minutes = parseInt(matches[2]) || 0;
    const seconds = parseInt(matches[3]) || 0;
    return hours * 60 + minutes + seconds / 60;
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Services</InputLabel>
        <Select
          multiple
          value={selectedServices}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((service) => (
                <Chip key={service.id} label={service.name} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {services.map((service) => (
            <MenuItem key={service.id} value={service}>
              {service.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div>Preis: {totalPrice.toFixed(2)} CHF </div>
      <div>Dauer: {totalDuration.toFixed(2)} Minuten</div>
      <div>Service IDs: {selectedServiceIds.join(', ')}</div>
    </div>
  );
}
