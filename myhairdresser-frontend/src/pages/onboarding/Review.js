import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {  useSelector } from 'react-redux';
import Button from '@mui/material/Button';

const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

export default function Review(props) {

  const hairdresserData = useSelector((state) => state.addHairdresserForm);

  return (
    <React.Fragment>

      {/* Titel of page */}
      <Typography variant="h6" gutterBottom>
        Zusammenfassung
      </Typography>


      { JSON.stringify(hairdresserData) }

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
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