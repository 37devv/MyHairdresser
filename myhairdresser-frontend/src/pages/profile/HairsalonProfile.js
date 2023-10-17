import React from 'react'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import OpeningTimes from './OpeningTimes';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import ContactInformation from './ContactInformation';
import HairsalonRating from './HairsalonRating';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const baseURL = 'http://localhost:8080/api';

const instance = axios.create({
  baseURL,
});




export default function HairsalonProfile() {

  const [data, setData] = React.useState({});
  const [fetchedImages, setFetchedImages] = React.useState([]);
  const [errorOccured, setErrorOccured] = React.useState(false);
  const { id } = useParams();

  React.useEffect(() => {

    async function fetchData() {

      try {
        setErrorOccured(false);

        const response = await instance.get('/hairsalons/' + id);
        setData(response.data);

        const imageObjects = response.data.images.map(x => ({
          original: x.link,
          thumbnail: x.link,
        }));
        setFetchedImages(imageObjects);

      } catch (error) {
        console.error("error happened " + error.message);
        setErrorOccured(true);
      }
    }
    fetchData();
  }, [])


  const content = errorOccured ? (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      This is an error alert — <strong>check it out!</strong>
    </Alert>
  ) : (
    <Container maxWidth="lg">
      <Typography variant="h1" gutterBottom>
        {data.name}
      </Typography>
      <ImageGallery items={fetchedImages} />
  
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h1" gutterBottom>
            Beschreibung
          </Typography>
          <p>{data.description}</p>
        </Grid>
        <Grid item xs={4}>
          <OpeningTimes openingTimes={data['daily-opening-hours']} services={data['services']} />
        </Grid>
  
        <Grid item xs={8}>
          <HairsalonRating />
        </Grid>
        <Grid item xs={4}>
          <ContactInformation
            contactInformation={{
              address: data.address,
              phonenumber: data.phonenumber,
              mail: data.mail,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
  
  return content;
}