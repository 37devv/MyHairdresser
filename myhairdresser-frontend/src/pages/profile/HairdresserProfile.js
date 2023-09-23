import React from 'react'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import OpeningTimes from './OpeningTimes';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import BasicRating from './Rating';
import ContactInformation from './ContactInformation';

const baseURL = 'http://localhost:8080/api';

const instance = axios.create({
  baseURL,
});

 const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
  {
    original: "https://www.coiffure-armida.ch/wp-content/uploads/2020/05/Coiffeur_Muri_Salon_.jpg",
    thumbnail: "https://www.coiffure-armida.ch/wp-content/uploads/2020/05/Coiffeur_Muri_Salon_.jpg"
  }
]; 



export default function HairdresserProfile() {

  const [data, setData] = React.useState({});
  const { id } = useParams();

  const imagesla = [];

  React.useEffect(() => {


    async function fetchData() {

      try {

        const response = await instance.get('/hairsalons/' + id); 
        
        const responseData = response.data;

        setData(responseData);

        const imageObjects = responseData.images.map(x => ({
          original: x.link,
          thumbnail: x.link,
        }));

        imagesla.push(imageObjects);

        console.log('Images fetched: ' + JSON.stringify(imageObjects));
        console.log('Images static: ' + JSON.stringify(images));

      } catch (error) {
        console.error(JSON.stringify(error));
      }
    }
    fetchData();
  }, [])



  return (
    <Container maxWidth="lg">

      <Typography variant="h1" gutterBottom>
       {data.name}
      </Typography>
      <ImageGallery items={images} />

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant="h1" gutterBottom>
            Beschreibung
          </Typography>
          <p>
            {data.description}            
          </p>
        </Grid>
        <Grid item xs={4}>
          <OpeningTimes />
        </Grid>




        <Grid item xs={8}>
          <BasicRating/>
        </Grid>
        <Grid item xs={4}>
          <ContactInformation data={{
            street: data.street,
            plz: data.plz,
            place: data.place,
            phonenumber: data.phonenumber,
            mail: data.mail
          }} />
        </Grid>
      </Grid>

    </Container>
  );
}