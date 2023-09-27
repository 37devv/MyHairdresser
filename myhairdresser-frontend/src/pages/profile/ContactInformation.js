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
          {props.contactInformation.street}
        </Typography>

        <Typography>
          {props.contactInformation.plz}
        </Typography>

        <Typography>
          {props.contactInformation.place}
        </Typography>

        <Typography>
          {props.contactInformation.mail}
        </Typography>

        <Typography>
          {props.contactInformation.phonenumber}
        </Typography>
      </CardContent>
    </Card>
  );
}
