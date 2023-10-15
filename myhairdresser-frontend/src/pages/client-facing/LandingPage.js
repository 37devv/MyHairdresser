import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import BookingBox from './BookingBox';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const centerTextButtonStyles = {
    textAlign: 'center',
    fontSize: '2rem', // Adjust the font size as needed
    margin: '0 auto', // Center horizontally
};

function LandingPage() {

    const navigate = useNavigate();

    const handleOnboardingRequest = () => {
        navigate('/client/onboarding');
    }

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
                <Typography style={centerTextButtonStyles}>
                    Onboarding für neuen Coiffersalon
                    <Button variant="contained" color="success" onClick={handleOnboardingRequest}>
                        Onboarding durchführen
                    </Button>
                </Typography>
            </Container>
        </React.Fragment>
    );
}
export default LandingPage;
