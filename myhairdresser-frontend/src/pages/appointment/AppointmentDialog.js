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


export default function AppointmentDialog({ services }) {
  const { handleSubmit, control, reset, formState } = useForm();
  const { isSubmitting } = formState;

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const appointmentData = {
    firstname: 'John',
    lastname: 'Doe',
    mail: 'johndoe@example.com',
    telephone: '123-456-7890',
    description: 'Appointment description',
    duration: 'PT1H', // ISO-8601 duration format
    price: 49.99,
    serviceIds: [1, 2, 3], // List of integers
    hairsalonid: 1,
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset(); // Reset the form when closing the dialog
  };

  const onSubmit = async (data) => {
    console.log("Form data:", data);
    // Make your axios post request here with the form data
    const {data: appointmentId} = await axios.post("http://localhost:8080/api/appointments", appointmentData);
    
    navigate("/client/appointment/" + appointmentId);
    handleClose(); // Close the dialog after submitting
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

            <ServiceCheckbox services={services} />

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
