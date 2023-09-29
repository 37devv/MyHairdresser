import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ServiceCheckbox from './ServiceCheckbox';

export default function AppointmentDialog({services}) {
    
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    console.log("Simulating handleSubmit")
    
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Termin buchen
      </Button>

      <Dialog open={open} onClose={handleClose}>

        <DialogTitle>Termin buchen</DialogTitle>


        <DialogContent>

          <DialogContentText>
            Füllen sie die Felder mit * aus und wählen sie die Services.
          </DialogContentText>

          <ServiceCheckbox services={services}/>


          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="Vorname*"
            
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            margin="dense"
            id="lastName"
            label="Nachname*"
            fullWidth
            variant="standard"
          />


          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address*"
            type="email"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            margin="dense"
            id="mobile"
            label="Mobiltelefon*"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Beschreibung"
            fullWidth
            variant="standard"
          />

        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Abbrechen</Button>
          <Button onClick={handleSubmit} variant="contained">Termin buchen</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
