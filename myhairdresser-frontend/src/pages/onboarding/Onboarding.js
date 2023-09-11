import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PaymentForm from './PaymentForm';
import Review from './Review';
import HairdresserForm from './HairdresserForm';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';

const steps = ['Coiffeursalon erstellen', 'Zahlung', 'Review'];

export default function Onboarding() {
  const [activeStep, setActiveStep] = React.useState(0);
  const history = useNavigate();

  const handleNext = () => {
    console.log(activeStep);
    setActiveStep(activeStep + 1);

    if(activeStep === 2){
      setTimeout(() => {
        history("/"); // Redirect to the specified route after the delay
      }, 1000);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <HairdresserForm handleNext={handleNext} />;
      case 1:
        return <PaymentForm handleNext={handleNext} />;
      case 2:
        return <Review  handleNext={handleNext}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            MyHairdresser
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="lg" >
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Vielen Dank für die Registration
              </Typography>
              <Typography variant="subtitle1">
                Loggen sie sich ein
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                {/* <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button> */}
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}