import React from 'react';
import axios from 'axios';
// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const AuthLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  
  const schema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    password: Yup.string().max(255).required('Password is required')
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'irdin.ibisevic@gmail.com',
      password: 'hallo123',
    },
  });

 

  
  const onSubmit = async (data) => {
    try {
      const endpoint = "http://localhost:8080/api/hairsalons/login"; 
      const response = await axios.post(endpoint, {
        mail: data.email,
        password: data.password
      });


      if (response.status === 200) {
        console.log(response)
        Cookies.set('loggedInUser', data.email, { expires: 7 }); // Expires in 7 days
        navigate("/");
      } else {
        console.log(response)
        setError("submit", { type: "manual", message: response.data.message });
      }
    } catch (err) {
      setError("submit", { type: "manual", message: err.response.data });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email-login">Email Address</InputLabel>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    id="email-login"
                    type="email"
                    placeholder="Enter email address"
                    fullWidth
                    error={Boolean(errors.email)}
                  />
                )}
              />
              {errors.email && (
                <FormHelperText error>
                  {errors.email.message}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="password-login">Password</InputLabel>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    fullWidth
                    error={Boolean(errors.password)}
                    id="password-login"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                )}
              />
              {errors.password && (
                <FormHelperText error>
                  {errors.password.message}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          {errors.submit && (
            <Grid item xs={12}>
              <FormHelperText error>{errors.submit.message}</FormHelperText>
            </Grid>
          )}
          <Grid item xs={12}>
            <AnimateButton>
              <Button
                disableElevation
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AuthLogin;
