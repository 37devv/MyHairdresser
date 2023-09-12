import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { persistHairdresser } from 'store/reducers/addHairdresser';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { DevTool } from "@hookform/devtools";
import Button from '@mui/material/Button';

export default function HairdresserForm(props) {

  const dispatch = useDispatch();

  const hairsalondetail = useSelector((state) => state.addHairdresserForm.hairsalondetail);
  
  const { handleSubmit, control } = useForm({
    defaultValues: {
      nameOfHairdresser: hairsalondetail.nameOfHairdresser,
      description: hairsalondetail.description,
      mail: hairsalondetail.mail,
      password: hairsalondetail.password,
      address: {
        street: hairsalondetail.address.street,
        plz: hairsalondetail.address.plz,
        place: hairsalondetail.address.place,
      },
    },
  });

  

  const onSubmit = async data => {
    console.log(data);
    dispatch(persistHairdresser(data));
    props.handleNext();
  }

  return (
    <React.Fragment>
      {JSON.stringify(hairsalondetail)}
      <Typography variant="h3" gutterBottom>
        Coiffeursalon erstellen
      </Typography>
      <Typography variant="h4" gutterBottom>
        Weitere Profilinfos können nachher im Dashboard ergänzt werden.
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <React.Fragment>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>                 
              <Controller
                name="nameOfHairdresser"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Name des Salons"
                    variant="outlined"
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>                 
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Beschreibung"
                    variant="outlined"
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>                 
              <Controller
                name="mail"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Mail"
                    variant="outlined"
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Grid>


            <Grid item xs={12} sm={6}>                 
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Passwort"
                    variant="outlined"
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>                 
              <Controller
                name="address.street"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Strasse"
                    variant="outlined"
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>                 
              <Controller
                name="address.plz"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="PLZ"
                    variant="outlined"
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>                 
              <Controller
                name="address.place"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Ort"
                    variant="outlined"
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Grid>

            
          </Grid>
        </React.Fragment>

        <Button
          variant="contained"
          type="submit"
          sx={{ mt: 3, ml: 1 }}
          
        >
          Weiter zur Zahlung

        </Button>
        
      </form>
      <DevTool control={control} />
    </React.Fragment>
  );
}