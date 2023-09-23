import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



export default function ContactInformation(props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          Kontaktinformationen
        </Typography>

        <Typography>
          {props.data.street}
        </Typography>

        <Typography>
          {props.data.plz}
        </Typography>

        <Typography>
          {props.data.place}
        </Typography>

        <Typography>
          {props.data.mail}
        </Typography>

        <Typography>
          {props.data.phonenumber}
        </Typography>
      </CardContent>
    </Card>
  );
}
