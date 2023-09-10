import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import Button from '@mui/material/Button';


const PaymentForm = (props) => {

  const { handleSubmit } = useForm();

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
      
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
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
    </div>
  );
}

export default PaymentForm;