import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AppointmentDialog from 'pages/appointment/AppointmentDialog';

const DAYS = {
  1: 'Montag',
  2: 'Dienstag',
  3: 'Mittwoch',
  4: 'Donnerstag',
  5: 'Freitag',
  6: 'Samstag',
  7: 'Sonntag'
};


export default function OpeningTimes(props) {
  const { openingTimes } = props;

  if (!openingTimes || openingTimes.length === 0) {
    // Handle the case where openingTimes is undefined or empty
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h3" gutterBottom>
            Öffnungszeiten
          </Typography>
          <p>No opening times available.</p>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained">Termin buchen</Button>
        </CardActions>
      </Card>
    );
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          Öffnungszeiten
        </Typography>
        <ul>
          {openingTimes.map((dayData, index) => (
            <li key={index}>
              <strong>{DAYS[dayData.day]}:</strong><br />
              {dayData.closed ? (
                <span>Geschlossen</span>
              ) : (
                <React.Fragment>
                  Morgen: {new Date(dayData['open-morning']).toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' })} - {new Date(dayData['closing-morning']).toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' })}<br />
                  Nachmittag: {new Date(dayData['open-afternoon']).toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' })} - {new Date(dayData['closing-afternoon']).toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit' })}<br />
                </React.Fragment>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardActions>

        <AppointmentDialog services={props.services} />
      </CardActions>
    </Card>
  );
}
