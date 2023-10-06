import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
    Typography, Grid, Paper, Box, List, ListItem, ListItemText
} from '@material-ui/core';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function humanReadableDuration(duration) {
    const matches = duration.match(/(\d+)([HM])/);
    const value = matches[1];
    const unit = matches[2];
    switch (unit) {
        case 'H':
            return `${value} Hour${value > 1 ? 's' : ''}`;
        case 'M':
            return `${value} Minute${value > 1 ? 's' : ''}`;
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
                    <Grid container spacing={2} justifyContent="center">

                        {/* Centralized Information */}
                        <Grid item xs={8}>
                            <Item>
                                {/* Client Information */}
                                <Typography variant="h6">Client Info</Typography>
                                <Typography><strong>Name:</strong> {data.firstname} {data.lastname}</Typography>
                                <Typography><strong>Email:</strong> {data.mail}</Typography>
                                <Typography><strong>Phone:</strong> {data.telephone}</Typography>
                                
                                <br />
                                {/* Appointment Information */}
                                <Typography variant="h6">Appointment Info</Typography>
                                <Typography><strong>Description:</strong> {data.description}</Typography>
                                <Typography><strong>Duration:</strong> {humanReadableDuration(data.duration)}</Typography>
                                
                                <br />
                                {/* Hair Salon Information */}
                                <Typography variant="h6">Hair Salon Info</Typography>
                                <Typography><strong>Name:</strong> {data.hairsalon.name}</Typography>
                                <Typography><strong>Location:</strong> {data.hairsalon.street}, {data.hairsalon.plz} {data.hairsalon.place}</Typography>
                                <Typography><strong>Phone:</strong> {data.hairsalon.phonenumber}</Typography>
                                <Typography><strong>Email:</strong> {data.hairsalon.mail}</Typography>

                                <br />
                                <Typography variant="h6">Services</Typography>
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
                            </Item>
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
