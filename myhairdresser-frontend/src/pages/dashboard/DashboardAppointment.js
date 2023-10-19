import React from 'react'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';
import axios from 'axios'
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import Button from '@mui/material/Button';

export default function DashboardAppointment(props) {

    const [selectedDate, setSelectedDate] = React.useState(dayjs());
    const [backendResponse, setBackendResponse] = React.useState(null);

    const handleDateChange = async (data) => {
        const localDate = dayjs(data.$d);
        setSelectedDate(localDate);

        const response = await axios.get("http://localhost:8080/api/appointments/filter", {
            params: {
                mail: props.mail,
                date: localDate.format('YYYY-MM-DD')
            }
        });
        setBackendResponse(response.data);
    };

    function formatDuration(duration) {
        const matches = duration.match(/PT(\d+H)?(\d+M)?/);
        if (!matches) return '';

        let hours = matches[1] ? parseInt(matches[1]) : 0;
        let minutes = matches[2] ? parseInt(matches[2]) : 0;

        let result = '';
        if (hours) {
            result += `${hours} ${hours > 1 ? 'Stunden' : 'Stunde'}`;
        }

        if (minutes) {
            if (result) result += ' ';
            result += `${minutes} ${minutes > 1 ? 'Minuten' : 'Minute'}`;
        }

        return result;
    }

    const cancelAppointment = async (id) => {
        console.log(id)
        try {
          const response = await axios.delete(`http://localhost:8080/api/appointments/${id}`);
          if (response.status === 204) {
            // The deletion was successful (status code 204 No Content)
            console.log("Appointment canceled successfully");
            // Redirect to the landing page
            window.location.href = '/free';
          } else {
            console.log("Appointment cancellation failed");
          }
        } catch (error) {
          console.error(error);
        }
      };


    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>
                Appointments Dashboard
            </Typography>
            <StaticDatePicker value={selectedDate} onChange={handleDateChange} />
            <br />

            {backendResponse?.length ? (
                backendResponse.map((appointment, index) => (
                    <Card key={index} sx={{ mt: 2 }}>
                        <CardContent>
                            <Typography variant="h6">{appointment.firstname} {appointment.lastname}</Typography>
                            <Typography color="textSecondary">{appointment.mail}</Typography>
                            <List>
                                <ListItem>
                                    <ListItemText primary="Preis" secondary={`CHF ${appointment.price}`} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Dauer" secondary={formatDuration(appointment.duration)} />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Telefon" secondary={appointment.telephone} />
                                </ListItem>
                                <Typography>Services:</Typography>
                                <ul>
                                    {appointment.services.map(service => (
                                        <li key={service.id}>
                                            {service.name}
                                        </li>
                                    ))}
                                </ul>
                            </List>
                            <Button variant="contained" color="error" onClick={() => cancelAppointment(appointment.appointmentidentifier)}>
                                Termin stornieren
                            </Button>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <Typography variant="h1" color="textSecondary" sx={{ mt: 3 }}>
                    Für den ausgewählten Tag sind keine Termine eingetragen
                </Typography>
            )}

        </Box>
    );
}
