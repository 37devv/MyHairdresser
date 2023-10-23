import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import BookingBox from './BookingBox';
import Pricing from './Pricing';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

function LandingPage() {
    return (
        <React.Fragment>
            <Container maxWidth="lg" sx={{marginTop: 5}}>
                {/* Set the alignItems prop to 'stretch' for the Grid container */}
                <Grid container spacing={10} alignItems="stretch">
                    <Grid item xs={4}>
                        <Paper elevation={3} sx={{ height: '100%' }}>
                            <Box sx={{ width: '100%', padding: 2 }}>
                                <Typography variant="h2">
                                    MyHairdresser
                                </Typography>
                                <br />
                                <Typography variant="h3">
                                    Buchungsplattform um Termine leichter zur vergeben für Coiffeure!
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper elevation={3} sx={{ height: '100%' }}>
                            <BookingBox />
                        </Paper>
                    </Grid>
                </Grid>
                <Pricing />
            </Container>
        </React.Fragment>
    );
}

export default LandingPage;
