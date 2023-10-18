import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import BookingBox from './BookingBox';
import Pricing from './Pricing';


function LandingPage() {


    return (
        <React.Fragment>


            <Container maxWidth="lg">
                <Grid container spacing={10}>
                    <Grid item xs={4}>
                        <Typography variant="h2">
                            MyHairdresser
                        </Typography>
                        <Typography variant="h3">
                            Buchungsplattform um Termine leichter zur vergeben für Coiffeure!
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>

                        <BookingBox />

                    </Grid>
                </Grid>
                
                <Pricing />
            </Container>
        </React.Fragment>
    );
}
export default LandingPage;
