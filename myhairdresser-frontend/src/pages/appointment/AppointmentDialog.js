import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ServiceCheckbox from './ServiceCheckbox';
import axios from 'axios';
import { DevTool } from "@hookform/devtools";
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';

const SEVERITY = {
  WARNING: "WARNING",
  OK: "OK",
  ERROR: "ERROR"
}

export default function AppointmentDialog({ services }) {
  const { handleSubmit, control, reset, formState } = useForm();
  const { isSubmitting } = formState;
  const { id } = useParams();

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(null);

  const [backendResponse, setBackendResponse] = React.useState(null);
  const [timeslot, setSelectedTimeslot] = React.useState(null);
  const [serviceIds, setServiceIds] = React.useState([]);


  const appointmentData = {
    firstname: 'John',
    lastname: 'Doe',
    mail: 'johndoe@example.com',
    telephone: '123-456-7890',
    description: 'Appointment description',
    duration: 'PT1H', // ISO-8601 duration format
    price: 49.99,
    serviceIds: serviceIds, // List of integers
    hairsalonid: 1,
    date: selectedDate
  };

  const handleDateChange = async (data) => {
    //First handle the data and format it in a correct way
    const date = data.$d;
    const localDate = dayjs(date).format('YYYY-MM-DD');
    setSelectedDate(localDate);


    //Send the date alongside ID of hairdresser to backend, to retrieve possible timeslots
    const params = new URLSearchParams({
      date: localDate,
      hairsalonid: id
    });
    
    serviceIds.forEach(id => params.append('serviceIds', id));
    
    const response = await axios.get("http://localhost:8080/api/appointments/availability", {
      params: params
    });
    setBackendResponse(response.data);
    console.log(response);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleServiceIdChange = (data) => {
    console.log("Servicecheckboxdata: " + data)
    setServiceIds(data);
  };

  const onSubmit = async (data) => {
    console.log("Form data:", data);
    const { data: appointmentId } = await axios.post("http://localhost:8080/api/appointments", appointmentData);

    navigate("/client/appointment/" + appointmentId);
    handleClose();
  };



  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Termin buchen
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Termin buchen</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <DialogContentText>
              Füllen Sie die Felder mit * aus und wählen Sie die Services.
            </DialogContentText>

            <ServiceCheckbox services={services} handleServiceIdChange={handleServiceIdChange} />

            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  label="Vorname*"
                  fullWidth
                  variant="standard"
                  {...field}
                />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  label="Nachname*"
                  fullWidth
                  variant="standard"
                  {...field}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  label="Email Address*"
                  type="email"
                  fullWidth
                  variant="standard"
                  {...field}
                />
              )}
            />

            <Controller
              name="mobile"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  label="Mobiltelefon*"
                  fullWidth
                  variant="standard"
                  {...field}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  label="Beschreibung"
                  fullWidth
                  variant="standard"
                  {...field}
                />
              )}
            />
          </DialogContent>

          <DatePicker value={selectedDate} disablePast onChange={handleDateChange} />

          {
            backendResponse && backendResponse.severity === SEVERITY.WARNING &&
            (
              <Alert severity="warning">{backendResponse.message}</Alert>
            )
          }

          {
            backendResponse && backendResponse.severity === SEVERITY.OK &&
            (
              <>
                <InputLabel id="demo-simple-select-label">Timeslot</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={timeslot} // You'll need to set this to some state variable to track the selected timeslot value
                  label="Age"  // "Age" doesn't seem relevant. You might want to change the label to "Timeslot" or something similar
                  onChange={e => setSelectedTimeslot(e.target.value)} // You'll likely want to set up a handler here to track the selected timeslot value
                >
                  {backendResponse.timeslots && backendResponse.timeslots.map((timeslot, index) => (
                    <MenuItem key={index} value={timeslot}>
                      {timeslot}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )
          }





          <DialogActions>
            <Button onClick={handleClose}>Abbrechen</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              Termin buchen
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <DevTool control={control} />
    </div>
  );
}
