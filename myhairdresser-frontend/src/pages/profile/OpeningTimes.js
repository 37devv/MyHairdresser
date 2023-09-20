import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function OpeningTimes() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h1" gutterBottom>
          Öffnungszeiten
        </Typography>
        {/* Iterate through weekdays and display them */}
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained">Termin buchen</Button>
      </CardActions>
    </Card>
  );
}
