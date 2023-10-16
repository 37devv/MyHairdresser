import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';

export default function Review(props) {

  const hairdresserData = useSelector((state) => state.addHairdresserForm);

  const displayOpeningTime = (dayData, dayName) => {
    if (dayData.closed) return <Typography gutterBottom>{dayName}: Geschlossen</Typography>;

    return (
      <Typography gutterBottom>
        {dayName}: {dayData.morningFrom} - {dayData.morningTo}, {dayData.afternoonFrom} - {dayData.afternoonTo}
      </Typography>
    );
  }
  return (
    <React.Fragment>

      {/* Titel of page */}
      <Typography variant="h3" gutterBottom>
        Zusammenfassung
      </Typography>
      <Grid container spacing={2}>


        <Grid item xs={12} sm={6}>
          <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
            Infos über den Coiffeur
          </Typography>
          <Typography gutterBottom>Name: {hairdresserData.hairsalondetail.nameOfHairdresser}</Typography>
          <Typography gutterBottom>Beschreibung: {hairdresserData.hairsalondetail.description}</Typography>
          <Typography gutterBottom>Mail: {hairdresserData.hairsalondetail.mail}</Typography>
          <Typography gutterBottom>Name: {hairdresserData.hairsalondetail.nameOfHairdresser}</Typography>
          <Typography gutterBottom>Adresse: {hairdresserData.hairsalondetail.address}</Typography>
        </Grid>


        <Grid item xs={12} sm={6}>
          <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
            Zahlungsdetails
          </Typography>
          <Typography gutterBottom>KK-NR: {hairdresserData.creditCard.number}</Typography>
          <Typography gutterBottom>Ablaufdatum: {hairdresserData.creditCard.expiry}</Typography>
          <Typography gutterBottom>Karteninhaber: {hairdresserData.creditCard.name}</Typography>
          <Typography gutterBottom>CVV/CVC: {hairdresserData.creditCard.cvc}</Typography>
        </Grid>


        <Grid item xs={12} sm={6}>
          <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
            Öffnungszeiten
          </Typography>
          {displayOpeningTime(hairdresserData.hairsalondetail.openingTimes.monday, "Montag")}
          {displayOpeningTime(hairdresserData.hairsalondetail.openingTimes.tuesday, "Dienstag")}
          {displayOpeningTime(hairdresserData.hairsalondetail.openingTimes.wednesday, "Mittwoch")}
          {displayOpeningTime(hairdresserData.hairsalondetail.openingTimes.thursday, "Donnerstag")}
          {displayOpeningTime(hairdresserData.hairsalondetail.openingTimes.friday, "Freitag")}
          {displayOpeningTime(hairdresserData.hairsalondetail.openingTimes.saturday, "Samstag")}
          {displayOpeningTime(hairdresserData.hairsalondetail.openingTimes.sunday, "Sonntag")}
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