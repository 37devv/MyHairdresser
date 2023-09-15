import * as React from 'react';
import Cards from 'react-credit-cards-2';
import { useWatch } from "react-hook-form"

export default function FormCard() {

    const number = useWatch({ name: "number" });
    const expiry = useWatch({ name: "expiry" });
    const cvc = useWatch({ name: "cvc" });
    const name = useWatch({ name: "name" });
    const focused = useWatch({ name: "focused" });

    return (
        <Cards
          number={number} 
          expiry={expiry}
          cvc={cvc}
          name={name}
          focused={focused}
        />
    )
}