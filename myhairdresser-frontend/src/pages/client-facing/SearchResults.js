import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Paper, Card, CardContent, Typography, CardMedia, List, ListItem } from '@mui/material';
import Alert from '@mui/lab/Alert';

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const latitude = queryParams.get('latitude');
  const longitude = queryParams.get('longitude');
  const services = queryParams.get('services');

  // State to store the results
  const [results, setResults] = React.useState([]);

  const navigateToSalon = (id) => {
    navigate(`/client/hairsalon/${id}`);
  };

  // Use useEffect to call the API when the component mounts
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/hairsalons/search', {
          params: {
            latitude: latitude,
            longitude: longitude,
            selectedServices: services
          }
        });
        setResults(response.data);
      } catch (error) {
        console.error("Error calling the API", error);
      }
    };

    fetchData();
  }, [latitude, longitude, services]);  // Only re-run the effect if these values change

  return (
    <div>
      {results.length === 0 ? (
        <Alert severity="warning">Keine Coiffeursalons im Umkreis von 20km</Alert>
      ) : (
        <List>
          {results.map(result => (
            <ListItem key={result.id} button onClick={() => navigateToSalon(result.id)}>
              <Paper style={{ width: '100%', marginBottom: '10px' }}>
                <Card>
                  {result.images[0] &&
                    <CardMedia
                      component="img"
                      height="140"
                      image={result.images[0].link}
                      alt="Hair salon image"
                    />
                  }
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {result.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {result.description}
                    </Typography>
                    <Typography variant="body1">
                      Address: {result.address}
                    </Typography>
                    <Typography variant="body1">
                      Phone: {result.phonenumber}
                    </Typography>
                    <Typography variant="body1">
                      Email: {result.mail}
                    </Typography>
                    {/* You can further add services, opening hours etc. similarly */}
                  </CardContent>
                </Card>
              </Paper>
            </ListItem>
          ))}
        </List>
      )}
      {/* Displaying latitude for your reference */}
      {latitude}
    </div>
  );
}
