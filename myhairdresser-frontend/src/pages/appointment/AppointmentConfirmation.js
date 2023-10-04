import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function AppointmentConfirmation() {
    const { id } = useParams();  // Assuming your path is something like '/resource/:id'
    
    const [data, setData] = useState(null);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/appointments/${id}`)
            .then(response => {
                setData(response.data);
                setAlertMessage('Data fetched successfully!');
                setAlertOpen(true);
            })
            .catch(error => {
                setAlertMessage(`Error fetching data: ${error.message}`);
                setAlertOpen(true);
            });
    }, [id]);  // The effect will re-run if 'id' changes

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };

    return (
        <div>
            {/* Your component's rendering logic here, perhaps something like: */}
            <div>{data ? JSON.stringify(data) : 'Loading...'}</div>
            
            <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default AppointmentConfirmation;
