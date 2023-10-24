import { useState } from 'react';
import React from 'react'
// material-ui
import {

  Grid,

  Typography
} from '@mui/material';


import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';



import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import DashboardAppointment from './DashboardAppointment';



// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {

  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();
  



  /** DATA TO DISPLAY */

  React.useEffect(() => {
    const user = Cookies.get('loggedInUser');

    if (user == null){
      console.log("inside if")
      navigate("/client/login");
    }

    const fetchData = async () => {

      try {
        console.log("before triggering request:" + user)
        const response = await axios.get(`http://localhost:8080/api/appointments/hairsalon/count?hairsalonEmail=${user}`);
        const totalPrice = await axios.get(`http://localhost:8080/api/appointments/hairsalon/totalPrice?hairsalonEmail=${user}`);

        if (response.status === 200) {
          setAppointmentsCount(response.data);
          setTotalPrice(totalPrice.data)
        } else {
          console.error("Error fetching appointments count:", response);
        }
      } catch (error) {
        console.error("Axios error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Anzahl Termine" count={appointmentsCount} percentage={59.3} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Umsatz" count={totalPrice + "CHF"} percentage={70.5} extra="8,900" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Besucher (fiktive Zahl)" count="18,800" percentage={27.4} extra="13'323" />
      </Grid>


      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Termine</Typography>
      </Grid>

      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <DashboardAppointment mail={Cookies.get('loggedInUser')}/>
      </Grid>


    </Grid>
  );
};

export default DashboardDefault;
