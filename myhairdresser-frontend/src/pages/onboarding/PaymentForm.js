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
      focused: '',
    },
  });
  const { handleSubmit, control, setValue } = methods;

  const onSubmit = async data => {
    console.log(data);
    props.handleNext();
  }

  const handleInputFocus = ({ target }) => {
    setValue('focused', target.name);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <Typography variant="h3" gutterBottom>
        INFO: Rein visuell - keine Zahlungsabwicklung!
      </Typography>
      <CreditCardTable />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormCard />

          <Controller
            name="number"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Kreditkartennummer"
                variant="outlined"
                onFocus={handleInputFocus}
                sx={{ width: '100%', mb: 2, marginTop: '20px' }}
              />
            )}
          />

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name des Inhabers"
                variant="outlined"
                onFocus={handleInputFocus}
                sx={{ width: '100%', mb: 2 }}
              />
            )}
          />

          <Controller
            name="expiry"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Ablaufdatum"
                variant="outlined"
                onFocus={handleInputFocus}
                sx={{ width: '100%', mb: 2 }}
              />
            )}
          />

          <Controller
            name="cvc"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="CVC/CVV"
                variant="outlined"
                onFocus={handleInputFocus}
                sx={{ width: '100%', mb: 2 }}
              />
            )}
          />

          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 3 }}

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