import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { persistHairdresser } from 'store/reducers/addHairdresser';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { DevTool } from "@hookform/devtools";
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function HairdresserForm(props) {

  const dispatch = useDispatch();

  const hairsalondetail = useSelector((state) => state.addHairdresserForm.hairsalondetail);

  const { handleSubmit, control, watch, setValue} = useForm({
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
      openingTimes: {
        monday: { morningFrom: '', morningTo: '', afternoonFrom: '', afternoonTo: '', closed: false },
        tuesday: { morningFrom: '', morningTo: '', afternoonFrom: '', afternoonTo: '', closed: false },
        wednesday: { morningFrom: '', morningTo: '', afternoonFrom: '', afternoonTo: '', closed: false },
        thursday: { morningFrom: '', morningTo: '', afternoonFrom: '', afternoonTo: '', closed: false },
        friday: { morningFrom: '', morningTo: '', afternoonFrom: '', afternoonTo: '', closed: false },
        saturday: { morningFrom: '', morningTo: '', afternoonFrom: '', afternoonTo: '', closed: false },
        sunday: { morningFrom: '', morningTo: '', afternoonFrom: '', afternoonTo: '', closed: false },
      },
    },
  });

  const handleCheckboxChange = (day) => (event) => {
    const setClosed = event.target.checked;
    const openingTimes = watch('openingTimes');
    console.log("before: "+ openingTimes[day].closed)
 
    

     // Update the openingTimes object
  openingTimes[day].closed = setClosed;

  // Use setValue to trigger a re-render of the form
  setValue(`openingTimes.${day}.closed`, setClosed);
  console.log("after: "+ openingTimes[day].closed)
  };

  const onSubmit = async data => {
    console.log(data);
    dispatch(persistHairdresser(data));
    props.handleNext();
  }

  const dayMappings = {
    monday: 'Montag',
    tuesday: 'Dienstag',
    wednesday: 'Mittwoch',
    thursday: 'Donnerstag',
    friday: 'Freitag',
    saturday: 'Samstag',
    sunday: 'Sonntag',
  };

  return (
    <React.Fragment>

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




            {Object.keys(dayMappings).map((day) => (
              <Grid container spacing={3} key={day}>
                <Grid item xs={12}>
                  <Typography variant="h6">{dayMappings[day]}</Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={`openingTimes.${day}.closed`}
                        onChange={handleCheckboxChange(day)}
                        color="primary"
                      />
                    }
                    label="Geschlossen"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name={`openingTimes.${day}.morningFrom`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="Morgen Von"
                        variant="outlined"
                        fullWidth
                        disabled={watch(`openingTimes.${day}.closed`)}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name={`openingTimes.${day}.morningTo`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="Morgen bis"
                        variant="outlined"
                        fullWidth
                        disabled={watch(`openingTimes.${day}.closed`)}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name={`openingTimes.${day}.afternoonFrom`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="Nachmittag Von"
                        variant="outlined"
                        fullWidth
                        disabled={watch(`openingTimes.${day}.closed`)}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name={`openingTimes.${day}.afternoonTo`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="Nachmittag bis"
                        variant="outlined"
                        fullWidth
                        disabled={watch(`openingTimes.${day}.closed`)}
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            ))}




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


      <Typography variant="h4" gutterBottom>Redux store: </Typography>
      {JSON.stringify(hairsalondetail)}

      <DevTool control={control} />
    </React.Fragment>
  );
}