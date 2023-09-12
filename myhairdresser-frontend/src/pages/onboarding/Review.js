import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {  useSelector } from 'react-redux';
import Button from '@mui/material/Button';

export default function Review(props) {

  const hairdresserData = useSelector((state) => state.addHairdresserForm);

  return (
    <React.Fragment>

      {/* Titel of page */}
      <Typography variant="h3" gutterBottom>
        Zusammenfassung
      </Typography>
      <Grid container spacing={2}>


        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Infos über den Coiffeur
          </Typography>
          <Typography gutterBottom>Name: {hairdresserData.hairsalondetail.nameOfHairdresser}</Typography>
          <Typography gutterBottom>Beschreibung: {hairdresserData.hairsalondetail.description}</Typography>
          <Typography gutterBottom>Mail: {hairdresserData.hairsalondetail.mail}</Typography>
          <Typography gutterBottom>Name: {hairdresserData.hairsalondetail.nameOfHairdresser}</Typography>
          <Typography gutterBottom>Strasse: {hairdresserData.hairsalondetail.address.street}</Typography>
          <Typography gutterBottom>Ort: {hairdresserData.hairsalondetail.address.place}</Typography>
          <Typography gutterBottom>PLZ: {hairdresserData.hairsalondetail.address.plz}</Typography>
        </Grid>


        <Grid item  xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Zahlungsdetails
          </Typography>
          <Typography gutterBottom>KK-NR: {hairdresserData.creditCard.number}</Typography>
          <Typography gutterBottom>Ablaufdatum: {hairdresserData.creditCard.expiry}</Typography>
          <Typography gutterBottom>Karteninhaber: {hairdresserData.creditCard.name}</Typography>
        </Grid>
      </Grid>

      <Button
          variant="contained"
          type="submit"
          sx={{ mt: 3, ml: 1 }}   
          onClick={props.handleNext}       
        >
          Bestätigen

      </Button>


    </React.Fragment>
  );
}