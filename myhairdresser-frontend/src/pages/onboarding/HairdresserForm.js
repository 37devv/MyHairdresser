import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from "react-hook-form";
import Input from "@material-ui/core/Input";
import { useDispatch } from 'react-redux';
import { onboardHairdresser } from 'store/reducers/addHairdresser';

export default function HairdresserForm() {

  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm({
    defaultValues: {

    }
  });
  const onSubmit = async data => {
    console.log(data);
    await dispatch(onboardHairdresser(data))
  }


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Coiffeursalon erstellen
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => <Input {...field} />}
      />
      <br />
      <Controller
        name="description"
        control={control}
        render={({ field }) => <Input {...field} />}
      />
      <input type="submit" />
    </form>
    </React.Fragment>
  );
}