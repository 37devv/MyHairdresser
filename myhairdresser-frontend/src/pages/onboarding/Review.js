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
          <Typography gutterBottom><strong>Name: </strong>{hairdresserData.hairsalondetail.nameOfHairdresser}</Typography>
          <Typography gutterBottom><strong>Beschreibung:</strong> {hairdresserData.hairsalondetail.description}</Typography>
          <Typography gutterBottom><strong>Mail:</strong> {hairdresserData.hairsalondetail.mail}</Typography>
          <Typography gutterBottom><strong>Name: </strong>{hairdresserData.hairsalondetail.nameOfHairdresser}</Typography>
          <Typography gutterBottom><strong>Adresse:</strong> {hairdresserData.hairsalondetail.address}</Typography>
        </Grid>


        <Grid item xs={12} sm={6}>
          <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
            Zahlungsdetails
          </Typography>
          <Typography gutterBottom><strong>KK-NR:</strong> {hairdresserData.creditCard.number}</Typography>
          <Typography gutterBottom><strong>Ablaufdatum:</strong> {hairdresserData.creditCard.expiry}</Typography>
          <Typography gutterBottom><strong>Karteninhaber:</strong> {hairdresserData.creditCard.name}</Typography>
          <Typography gutterBottom><strong>CVV/CVC:</strong> {hairdresserData.creditCard.cvc}</Typography>
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

        <Grid item xs={12} sm={6}>
          <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
            Dienstleistungen
          </Typography>
          {hairdresserData.hairsalondetail.services.map((service, index) => (
            <Typography key={index} gutterBottom>
              {service.name} - {service.price} CHF ({service.duration} Min)
            </Typography>
          ))}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
            Bilder
          </Typography>
          <Grid container spacing={2}>
            {hairdresserData.hairsalondetail.images.map((image, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <img src={image} alt={`Bild ${index + 1}`} style={{ width: '100%', borderRadius: '5px' }} />
              </Grid>
            ))}
          </Grid>
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