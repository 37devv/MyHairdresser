import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function OpeningTimes(props) {

  const { openingTimes } = props;

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          Öffnungszeiten
        </Typography>
        {openingTimes.map((dayData, index) => (
          <li key={index}>
            <strong>{dayData.day}:</strong><br />
            Morning: {new Date(dayData['open-morning']).toLocaleTimeString()} - {new Date(dayData['closing-morning']).toLocaleTimeString()}<br />
            Afternoon: {new Date(dayData['open-afternoon']).toLocaleTimeString()} - {new Date(dayData['closing-afternoon']).toLocaleTimeString()}<br />
          </li>
        ))}
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained">Termin buchen</Button>
      </CardActions>
    </Card>
  );
}
