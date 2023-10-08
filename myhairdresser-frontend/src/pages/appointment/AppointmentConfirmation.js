import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
    Typography, Grid, Box, List, ListItem, ListItemText
} from '@material-ui/core';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

function humanReadableDuration(duration) {
    const matches = duration.match(/(\d+)([HM])/);
    const value = matches[1];
    const unit = matches[2];
    switch (unit) {
        case 'H':
            return `${value} Stunde${value > 1 ? 'n' : ''}`;
        case 'M':
            return `${value} Minute${value > 1 ? 'n' : ''}`;
        default:
            return duration;
    }
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

    return (
        <div>
            {data ? (
                <Box sx={{ flexGrow: 1, marginTop: 20 }}>

                    <Alert severity="success">Termin erfolgreich gebucht</Alert>

                    <Grid container spacing={2} justifyContent="center">

                        {/* Centralized Information */}
                        <Grid item xs={8}>

                            <Typography variant="h6">Infos zum Termin:</Typography>
                            <Typography>Datum/Uhrzeit:</Typography>
                            <Typography>Gebuchte Services:</Typography>
                            <Typography>Dauer: {humanReadableDuration(data.duration)}</Typography>
                            <Typography>Preis: {data.price} CHF</Typography>
                            <Typography>Allfällige Info Ihrer Seite:</Typography>

                            <br />
                            {/* Hair Salon Information */}
                            <Typography variant="h6">Coiffeursalon Info</Typography>
                            <Typography>Name: {data.hairsalon.name}</Typography>
                            <Typography>Location: {data.hairsalon.street}, {data.hairsalon.plz} {data.hairsalon.place}</Typography>
                            <Typography>Phone: {data.hairsalon.phonenumber}</Typography>
                            <Typography>Email: {data.hairsalon.mail}</Typography>

                            <br />
                            <Typography variant="h6">Services</Typography>

                            needs to be overworked!!!!!! IS currently returning all services

                            <List>
                                {data.hairsalon.services.map(service => (
                                    <ListItem key={service.id}>
                                        <ListItemText
                                            primary={service.name}
                                            secondary={`Price: ${formatPrice(service.price)}, Duration: ${humanReadableDuration(service.duration)}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                            <Button variant="contained" color="error">
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
