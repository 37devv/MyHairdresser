import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
              <strong>{dayData.day}:</strong><br />
              Morning: {new Date(dayData['open-morning']).toLocaleTimeString('de-CH', {hour: '2-digit', minute: '2-digit'})} - {new Date(dayData['closing-morning']).toLocaleTimeString('de-CH', {hour: '2-digit', minute: '2-digit'})}<br />
              Afternoon: {new Date(dayData['open-afternoon']).toLocaleTimeString('de-CH', {hour: '2-digit', minute: '2-digit'})} - {new Date(dayData['closing-afternoon']).toLocaleTimeString('de-CH', {hour: '2-digit', minute: '2-digit'})}<br />
              Lunch Break: {dayData['has-lunch-break'] ? 'Yes' : 'No'}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained">Termin buchen</Button>
      </CardActions>
    </Card>
  );
}
