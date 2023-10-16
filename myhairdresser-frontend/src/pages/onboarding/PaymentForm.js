import React from 'react';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm, Controller, FormProvider } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { DevTool } from "@hookform/devtools";
import FormCard from './FormCard';
import CreditCardTable from './CreditCardTable';

const PaymentForm = (props) => {

  const methods = useForm({
    defaultValues: {
      number: '',
      expiry: '',
      cvc: '',
      name: '',
      focus: '',
    },
  });
  const { handleSubmit, control } = methods;

  const onSubmit = async data => {
    console.log(data);
    props.handleNext();
  }

  return (
    <div>

      <Typography variant="h3" gutterBottom>
        INFO: Rein visuell - keine Zahlungsabwicklung!



      </Typography>
<CreditCardTable/>

      <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* //usewatch hook  innerhalb einer komponente wo in einem form gerendert wird */}

        <FormCard />

        <Controller
          name="number"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Kreditkartennummer"
              variant="outlined"
              fullWidth
            />
          )}
        />

        <Button
          variant="contained"
          type="submit"
          sx={{ mt: 3, ml: 1 }}

        >
          Weiter zur Überprüfung

        </Button>
      </form>
      </FormProvider>
      <DevTool control={control} />
    </div>
  );
}

export default PaymentForm;