import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ServiceSelection from './ServiceSelection';
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
  const { isSubmitting, errors } = formState;
  const { id } = useParams();

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(dayjs());

  const [backendResponse, setBackendResponse] = React.useState(null);
  const [timeslot, setSelectedTimeslot] = React.useState(null);
  const [serviceIds, setServiceIds] = React.useState([]);

  const onSubmit = async (data) => {
    console.log("Form data:", data);
    console.log("timeslot: ", timeslot)
    console.log("selectedDate: ", selectedDate)

    const { data: appointmentId } = await axios.post("http://localhost:8080/api/appointments",
      {
        firstname: data.firstname,
        lastname: data.lastname,
        mail: data.email,
        telephone: data.telephone,
        description: data.description,
        serviceIds: serviceIds, // List of integers
        hairsalonid: id,
        date: selectedDate,
        time: data.timeslot
      });

    navigate("/client/appointment/" + appointmentId);
    handleClose();
  };


  const handleDateChange = async (data) => {
    console.log(data)
    //First handle the data and format it in a correct way

    const localDate = dayjs(data.$d);
    setSelectedDate(localDate);


    //Send the date alongside ID of hairdresser to backend, to retrieve possible timeslots
    const params = new URLSearchParams({
      date: localDate.format('YYYY-MM-DD'),
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

  const handleServiceIdChange = async (data) => {
    setServiceIds(data);

    //Send the date alongside ID of hairdresser to backend, to retrieve possible timeslots
    const params = new URLSearchParams({
      date: selectedDate.format('YYYY-MM-DD'),
      hairsalonid: id
    });

    data.forEach(id => params.append('serviceIds', id));

    const response = await axios.get("http://localhost:8080/api/appointments/availability", {
      params: params
    });
    setBackendResponse(response.data);
    console.log(response);

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

            <ServiceSelection services={services} handleServiceIdChange={handleServiceIdChange} />
            {
              serviceIds.length === 0 &&
              (
                <Alert severity="info">Sie müssen minimum ein Service auswählen</Alert>
              )
            }
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              rules={{ required: "Vorname is required" }}  // <-- Set the required rule here
              render={({ field, fieldState }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  label="Vorname*"
                  fullWidth
                  variant="standard"
                  error={!!fieldState.error}
                  helperText={fieldState.error ? fieldState.error.message : null}
                  {...field}
                />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{ required: "Nachname is required" }}  // <-- Set the required rule here
              render={({ field, fieldState }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  label="Nachname*"
                  fullWidth
                  variant="standard"
                  error={!!fieldState.error}
                  helperText={fieldState.error ? fieldState.error.message : null}
                  {...field}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Email Address is required" }}  // <-- Set the required rule here
              render={({ field, fieldState }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  label="Email Address*"
                  type="email"
                  fullWidth
                  variant="standard"
                  error={!!fieldState.error}
                  helperText={fieldState.error ? fieldState.error.message : null}
                  {...field}
                />
              )}
            />

            <Controller
              name="mobile"
              control={control}
              defaultValue=""
              rules={{ required: "Mobiltelefon is required" }}  // <-- Set the required rule here
              render={({ field, fieldState }) => (
                <TextField
                  autoFocus
                  margin="dense"
                  label="Mobiltelefon*"
                  fullWidth
                  variant="standard"
                  error={!!fieldState.error}
                  helperText={fieldState.error ? fieldState.error.message : null}
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


            <DatePicker disabled={serviceIds.length === 0}  value={selectedDate} onChange={handleDateChange} />



            {
              selectedDate === null &&
              (
                <Alert severity="info">Sie müssen ein Datum auswählen</Alert>
              )
            }

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
                  <InputLabel id="timeslot-select-label">Timeslot</InputLabel>
                  <Controller
                    name="timeslot"
                    control={control}
                    defaultValue=""
                    value={timeslot}
                    onChange={e => setSelectedTimeslot(e.target.value)}
                    rules={{ required: "Sie müssen einen Timeslot auswählen" }}
                    render={({ field, fieldState }) => (
                      <Select
                        {...field}
                        labelId="timeslot-select-label"
                        id="timeslot-select"
                        error={!!fieldState.error}
                        label="Timeslot"
                      >
                        {backendResponse.timeslots && backendResponse.timeslots.map((timeslot, index) => (
                          <MenuItem key={index} value={timeslot}>
                            {timeslot}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.timeslot && <p style={{ color: 'red' }}>{errors.timeslot.message}</p>} {/* Display error message if there's an error */}
                </>
              )
            }

          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Abbrechen</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting || selectedDate === null}
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
