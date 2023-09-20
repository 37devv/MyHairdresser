import React from 'react'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import OpeningTimes from './OpeningTimes';
//import axios from 'axios';

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

  //const [data, setData] = React.useState({});

  React.useEffect(() => {

    console.log("not empty")


  }, [])


  return (
    <Container maxWidth="lg">

      <h1>Testname</h1>
      <ImageGallery items={images} />

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <h2>Beschreibung</h2>
          <p>

            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur purus risus, consectetur sit amet gravida vitae, accumsan eu tortor. Quisque semper imperdiet tellus non sollicitudin. Integer in ligula id magna ullamcorper pharetra sed et mauris. Sed tortor est, varius nec ultrices id, blandit id metus. Fusce ultrices nisi mollis justo cursus viverra. Etiam lobortis in est sed viverra. Vestibulum elementum efficitur est, sit amet rhoncus elit. Suspendisse tristique at neque mollis faucibus. Donec sit amet ullamcorper orci. Praesent egestas magna sit amet orci rutrum, a blandit turpis placerat. Ut et ipsum vel risus eleifend ornare. Morbi imperdiet, nisi vel tincidunt ultrices, nulla dui semper eros, sit amet varius ligula risus sed orci. Suspendisse porttitor sed nunc a dignissim. Sed augue urna, lobortis a dignissim ut, bibendum at nunc. In ac est vitae elit ultricies imperdiet ac nec felis.

            Morbi lacinia ligula vel elit congue sollicitudin. Quisque varius sollicitudin magna, eget tristique mi suscipit at. Sed consectetur nisl eleifend dui semper, quis elementum tellus viverra. Aliquam nec molestie nisl. Sed facilisis lectus enim, molestie sodales velit rhoncus sit amet. Proin feugiat erat lacus, non lobortis quam sagittis quis. Suspendisse commodo suscipit arcu, nec bibendum mi tincidunt non. Nulla non erat rutrum, porttitor dolor et, pulvinar est.

            Cras pellentesque pharetra sapien, in semper odio sollicitudin ut. Nam euismod egestas nisi quis congue. Phasellus imperdiet leo eget dolor finibus pharetra. Vivamus malesuada, mauris dictum rhoncus mollis, leo tortor accumsan tellus, ac euismod magna sapien eu ipsum. Nam a faucibus est. Nullam elit massa, semper vel laoreet eu, malesuada sit amet risus. Donec luctus massa non nisi condimentum, et sollicitudin felis mattis. In hac habitasse platea dictumst. Cras ac gravida turpis. Ut eu pulvinar velit. Vestibulum condimentum interdum felis, quis fermentum lacus. Donec malesuada turpis placerat lacus fermentum consectetur.

            Etiam feugiat nisi sapien, in ultricies nulla vehicula a. Aliquam viverra massa magna, at maximus massa lobortis vitae. Sed iaculis tempus lectus a pellentesque. Phasellus at purus nec mauris fermentum elementum vitae a eros. Duis sollicitudin tincidunt velit quis pulvinar. Donec efficitur vitae sem eu aliquam. Etiam auctor finibus blandit. Ut volutpat sed turpis ac mollis. Pellentesque tempor mauris ligula, sit amet volutpat purus faucibus bibendum. Nam vitae odio vitae nibh vestibulum maximus.

            Sed id tortor lacinia augue placerat sodales id sit amet ligula. Pellentesque nunc leo, blandit eget ornare quis, pulvinar in lacus. Etiam ac blandit orci. Fusce bibendum purus nec efficitur gravida. Nullam egestas eget ante finibus facilisis. Vestibulum viverra sagittis mauris, vitae posuere nulla aliquet eu. Nulla vitae turpis in magna dictum iaculis sed nec eros. Fusce fermentum est in magna porta, eget gravida magna scelerisque. Nunc efficitur ornare varius. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris tempus sollicitudin neque finibus aliquet. Aenean tempor eros orci, quis ultricies dolor accumsan ut. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc nec sapien turpis.

          </p>
        </Grid>
        <Grid item xs={4}>
          <OpeningTimes />
        </Grid>

        <Grid item xs={12}>
          <h1>Bewertungen</h1>
        </Grid>

      </Grid>






    </Container>
  );
}