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

  const nameOfHairdresser = useSelector((state) => state.addHairdresserForm.nameOfHairdresser);
  
  const { handleSubmit, control } = useForm({
    defaultValues: {
      nameOfHairdresser: nameOfHairdresser,
      description: '',
    },
  });

  

  const onSubmit = async data => {
    console.log(data);
    dispatch(persistHairdresser(data));
    props.handleNext();
    //await dispatch(onboardHairdresser(data))
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Coiffeursalon erstellen
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
                    label="Example"
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