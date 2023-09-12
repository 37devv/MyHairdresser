import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { DevTool } from "@hookform/devtools";

const PaymentForm = (props) => {

  const { handleSubmit, control } = useForm({
    defaultValues: {
      number: '',
      expiry: '',
      cvc: '',
      name: '',
      focus: '',
    },
  });

  const onSubmit = async data => {
    console.log(data);
    props.handleNext();
  }

  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    
    setState((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }

  

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        INFO: Rein visuell - keine Zahlungsabwicklung!
      </Typography>

      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="number"
          control={control}
          render={({ field }) => (
            /* Anordnung von  {...field} macht Probleme */
            <TextField
              {...field}
              label="Kreditkartennummer"
              variant="outlined"
              fullWidth
              onChange={e => {
                setState((prevState) => ({
                  ...prevState,
                  number: e.target.value
                }));
              }}
              value={state.number}
              onFocus={handleInputFocus}
              
            />
          )}
        />

        <input
          type="number"
          name="number"
          placeholder="Card Number"
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="expiry"
          name="expiry"
          placeholder="Card expiry"
          value={state.expiry}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="name"
          name="name"
          placeholder="Card name"
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="cvc"
          name="cvc"
          placeholder="Card cvc"
          value={state.cvc}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />

        <Button
          variant="contained"
          type="submit"
          sx={{ mt: 3, ml: 1 }}
          
        >
          Weiter zur Überprüfung

        </Button>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default PaymentForm;