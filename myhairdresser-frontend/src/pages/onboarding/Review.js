import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';

export default function Review(props) {
  const hairdresserData = useSelector((state) => state.addHairdresserForm);

  const displayOpeningTime = (dayData) => {
    if (dayData.closed) return <Typography gutterBottom>{dayData.dayName}: Geschlossen</Typography>;

    return (
      <Typography gutterBottom>
        {dayData.dayName}: {dayData['open-morning']} - {dayData['closing-morning']}, {dayData['open-afternoon']} - {dayData['closing-afternoon']}
      </Typography>
    );
  };

  const dayNames = {
    1: 'Montag',
    2: 'Dienstag',
    3: 'Mittwoch',
    4: 'Donnerstag',
    5: 'Freitag',
    6: 'Samstag',
    7: 'Sonntag',
  };

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
          {hairdresserData.hairsalondetail.openingTimes.map((dayData) => (
            displayOpeningTime({
              ...dayData,
              dayName: dayNames[dayData.day],
            })
          ))}
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
