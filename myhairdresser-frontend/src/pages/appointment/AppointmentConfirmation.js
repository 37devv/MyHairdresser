import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
    Typography, Grid, Box
} from '@material-ui/core';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { getAppointmentTimeRange } from './AppointmentTimeRangeUtil';

function isoDurationToGermanFormat(duration) {
    const matches = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!matches) {
        throw new Error("Invalid ISO 8601 duration format");
    }

    const hours = matches[1] ? parseInt(matches[1], 10) : 0;
    const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
    
    let result = "";

    if (hours > 0) {
        result += `${hours} ${hours === 1 ? "Stunde" : "Stunden"}`;
    }

    if (minutes > 0) {
        if (result) result += " ";
        result += `${minutes} ${minutes === 1 ? "Minute" : "Minuten"}`;
    }

    return result || "Invalid duration";
}



function formatPrice(price) {
    return `${price.toFixed(2)}CHF`;
}



function AppointmentConfirmation() {
    const { id } = useParams();

    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/appointments/${id}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const cancelAppointment = async () => {
        try {
          const response = await axios.delete(`http://localhost:8080/api/appointments/${id}`);
          if (response.status === 204) {
            // The deletion was successful (status code 204 No Content)
            console.log("Appointment canceled successfully");
            // Redirect to the landing page
            window.location.href = '/free/client/landing';
          } else {
            console.log("Appointment cancellation failed");
          }
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <div>
            {data ? (
                <Box sx={{ flexGrow: 1, marginTop: 20 }}>

                    <Alert severity="success">Termin erfolgreich gebucht</Alert>

                    <Grid container spacing={2} justifyContent="center">

                        {/* Centralized Information */}
                        <Grid item xs={8}>

                            <Typography variant="h6">Infos zum Termin:</Typography>
                            <Typography><strong>Datum/Uhrzeit:</strong> {dayjs(data.date).format('DD.MM.YYYY')} {getAppointmentTimeRange(data)}</Typography>
                            <Typography><strong>Gebuchte Services:</strong> {data.services.map((service, index, array) => (
                                <span key={service.id}>
                                    {service.name}
                                    {index !== array.length - 1 && ", "}
                                </span>
                            ))}</Typography>
                            <Typography><strong>Dauer:</strong> {isoDurationToGermanFormat(data.duration)}</Typography>
                            <Typography><strong>Preis:</strong> {formatPrice(data.price)}</Typography>

                            <br />
                            {/* Hair Salon Information */}
                            <Typography variant="h6">Coiffeursalon Info</Typography>
                            <Typography><strong>Name:</strong> {data.hairsalon.name}</Typography>
                            <Typography><strong>Location:</strong> {data.hairsalon.street}, {data.hairsalon.plz} {data.hairsalon.place}</Typography>
                            <Typography><strong>Phone:</strong> {data.hairsalon.phonenumber}</Typography>
                            <Typography><strong>Email:</strong> {data.hairsalon.mail}</Typography>

                            <br />
                            
                            <Button variant="contained" color="error" onClick={cancelAppointment}>
                                Termin stornieren
                            </Button>
                        </Grid>

                    </Grid>
                </Box>
            ) : (
                <Typography>Loading...</Typography>
            )}
        </div>
    );
}

export default AppointmentConfirmation;
