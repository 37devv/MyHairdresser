import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { persistHairdresser } from 'store/reducers/addHairdresser';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { DevTool } from "@hookform/devtools";
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';

export default function HairdresserForm(props) {

  const dispatch = useDispatch();

  const hairsalondetail = useSelector((state) => state.addHairdresserForm.hairsalondetail);

  const { handleSubmit, control, watch, setValue } = useForm({
    defaultValues: hairsalondetail
  });



  const handleCheckboxChange = (day) => (event) => {
    const setClosed = event.target.checked;
    const openingTimes = watch('openingTimes');
    // Update the openingTimes object
    openingTimes[day].closed = setClosed;
    // Use setValue to trigger a re-render of the form
    setValue(`openingTimes.${day}.closed`, setClosed);
  };

  const onSubmit = async data => {
    console.log(data);
    dispatch(persistHairdresser(data));
    props.handleNext();
  }

  const services = useFieldArray({
    control,
    name: 'services',
    keyName: 'serviceKey',
  });

  const addService = () => {
    services.append({ name: '', price: '', duration: '' });
  };

  const removeService = (index) => {
    services.remove(index);
  };

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

            <Grid item xs={12} sm={6}>

              {/* Empty grid so it looks nicer in the form */}
            </Grid>

            <Grid item xs={12} sm={6}>

              <Typography variant="h3" style={{ marginBottom: '8px' }}>
                Öffnungszeiten
              </Typography>
            </Grid>



            {Object.keys(dayMappings).map((day, index) => (
              <div
                key={day}
                style={{
                  display: 'inline-block',
                  width: '50%',
                  marginBottom: '16px',
                  marginTop: '16px',
                  paddingRight: '8px', // Add space on the right side
                  marginLeft: '8px', // Add margin on the left side
                  border: '1px solid #ccc', // Add a border
                  padding: '16px', // Add padding
                }}
              >
                <Typography variant="h5" style={{ marginBottom: '8px' }}>
                  {dayMappings[day]}
                </Typography>
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
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <div style={{ width: '45%' }}>
                    <Controller
                      name={`openingTimes.${day}.morningFrom`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          label="Morgen Von"
                          variant="outlined"
                          size="small"
                          fullWidth
                          disabled={watch(`openingTimes.${day}.closed`)}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  <div style={{ width: '45%' }}>
                    <Controller
                      name={`openingTimes.${day}.morningTo`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          label="Morgen bis"
                          variant="outlined"
                          size="small"
                          fullWidth
                          disabled={watch(`openingTimes.${day}.closed`)}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '8px' }}>
                  <div style={{ width: '45%' }}>
                    <Controller
                      name={`openingTimes.${day}.afternoonFrom`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          label="Nachmittag Von"
                          variant="outlined"
                          size="small"
                          fullWidth
                          disabled={watch(`openingTimes.${day}.closed`)}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  <div style={{ width: '45%' }}>
                    <Controller
                      name={`openingTimes.${day}.afternoonTo`}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          label="Nachmittag bis"
                          variant="outlined"
                          size="small"
                          fullWidth
                          disabled={watch(`openingTimes.${day}.closed`)}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </div>
                {index % 2 === 0 && <br />} {/* Add a line break after every pair of days */}
              </div>
            ))}







          </Grid>


          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Services
              </Typography>
            </Grid>
            {services.fields.map((service, index) => (
              <React.Fragment key={service.serviceKey}>
                <Grid item xs={3}>
                  <Controller
                    name={`services[${index}].name`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField label="Name" variant="outlined" fullWidth {...field} />
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Controller
                    name={`services[${index}].price`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField label="Price" variant="outlined" fullWidth {...field} />
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Controller
                    name={`services[${index}].duration`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField label="Duration" variant="outlined" fullWidth {...field} />
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <IconButton onClick={() => removeService(index)} color="secondary">
                    Remove
                  </IconButton>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button variant="outlined" onClick={addService}>
                Add Service
              </Button>
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