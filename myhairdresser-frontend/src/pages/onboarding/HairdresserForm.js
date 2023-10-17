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
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PlaceAutocompleteRHF from 'pages/client-facing/PlaceAutocompleteRHF';

export default function HairdresserForm(props) {

  const dispatch = useDispatch();

  const hairsalondetail = useSelector((state) => state.addHairdresserForm.hairsalondetail);

  const { handleSubmit, control, watch, setValue, getValues } = useForm({
    defaultValues: hairsalondetail
  });



  const handleCheckboxChange = (day) => (event) => {
    const setClosed = event.target.checked;
    const openingTimes = watch('openingTimes');
    console.log('Before:', openingTimes);
    openingTimes[day].closed = setClosed;
    setValue(`openingTimes.${day}.closed`, setClosed);
    console.log('After:', watch('openingTimes'));
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


  const images = useFieldArray({
    control,
    name: 'images', // Update the field name to match your data structure
    keyName: 'imageKey',
  });

  const addImage = () => {
    // Append a new empty string to the images array using the fields object
    const currentImages = watch('images');

    // If the last image in the list is not empty or the list is empty, then append a new empty string.
    if (!currentImages.length || (currentImages[currentImages.length - 1] && currentImages[currentImages.length - 1].trim() !== '')) {
      images.append();
    }
  };

  const removeImage = (index) => {
    // Remove the image at the specified index using the fields object
    images.remove(index);
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
                    type="password"
                    variant="outlined"
                    fullWidth
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>

              <Controller
                name="address"
                control={control}
                render={({ field, fieldState, formState }) => (
                  <PlaceAutocompleteRHF
                    field={field}
                    fieldState={fieldState}
                    formState={formState}
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



            {Object.keys(dayMappings).map((day, index) => {
              const isClosed = getValues(`openingTimes.${day}.closed`);

              return (
                <div
                  key={day}
                  style={{
                    display: 'inline-block',
                    width: '50%',
                    marginBottom: '16px',
                    marginTop: '16px',
                    paddingRight: '8px',
                    marginLeft: '8px',
                    border: '1px solid #ccc',
                    padding: '16px',
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
                        checked={isClosed}
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
                            disabled={isClosed}
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
                            disabled={isClosed}
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
                            disabled={isClosed}
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
                            disabled={isClosed}
                            {...field}
                          />
                        )}
                      />
                    </div>
                  </div>
                  {index % 2 === 0 && <br />}
                </div>
              );
            })}







          </Grid>


          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3" gutterBottom>
                Service
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
                  <IconButton
                    onClick={() => removeService(index)}
                    color="secondary"
                    aria-label={`Remove Service ${index + 1}`}
                    sx={{ color: 'red', marginLeft: '20px' }}
                  >
                    <DeleteIcon />
                    Entfernen
                  </IconButton>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button variant="contained" color="success" onClick={addService}>
                Service hinzufügen
                <AddIcon />
              </Button>
            </Grid>
          </Grid>







          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h3" gutterBottom sx={{ marginTop: '20px' }}>
                Bilder
              </Typography>
            </Grid>
            {images.fields.map((image, index) => (
              <React.Fragment key={index}>
                <Grid item xs={10}>
                  <Controller
                    name={`images[${index}]`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField label="Image Link" variant="outlined" fullWidth {...field} />
                    )}
                  />

                </Grid>
                <Grid item xs={2}>


                  <IconButton
                    onClick={() => removeImage(index)}
                    color="secondary"
                    aria-label={`Remove Service ${index + 1}`}
                    sx={{ color: 'red', marginLeft: '20px' }}
                  >
                    <DeleteIcon />
                    Entfernen
                  </IconButton>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button variant="contained" color="success" onClick={addImage}>
                Bild hinzufügen
                <AddIcon />
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