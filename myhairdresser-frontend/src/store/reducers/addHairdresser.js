// types
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// initial state
const initialState = {
  hairsalondetail: {
    name: 'Irdins coiffeur',
    mail:'irdin.ibisevic@gmail.com',
    password:'hallo123',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    address: "",
    phonenumber:"079 558 46 83",
    longitude: null,
    latitude: null,
    openingTimes: [
      {
        day: 1,
        "open-morning": "08:00",
        "closing-morning": "12:00",
        "open-afternoon": "13:00",
        "closing-afternoon": "17:00",
        closed: false,
      },
      {
        "day": 2,
        "open-morning": "08:00",
        "closing-morning": "12:00",
        "open-afternoon": "13:00",
        "closing-afternoon": "17:00",
        "closed": false
      },
      {
        "day": 3,
        "open-morning": "08:00",
        "closing-morning": "12:00",
        "open-afternoon": "13:00",
        "closing-afternoon": "17:00",
        "closed": false
      },
      {
        "day": 4,
        "open-morning": "08:00",
        "closing-morning": "12:00",
        "open-afternoon": "13:00",
        "closing-afternoon": "17:00",
        "closed": false
      },
      {
        "day": 5,
        "open-morning": "08:00",
        "closing-morning": "12:00",
        "open-afternoon": "13:00",
        "closing-afternoon": "17:00",
        "closed": false
      },
      {
        "day": 6,
        "closed": true
      },
      {
        "day": 7,
        "closed": true
      }
    ],
    services: [
      {name: 'Haare schneiden', price: 25, duration: '30'},
      {name: 'Augenbrauen kürzen', price: 10, duration: '5'},
      {name: 'Bart kürzen', price: 15, duration: '10'},
    ],
    images: [
      'https://www.coiffure-armida.ch/wp-content/uploads/2020/05/Coiffeur_Muri_Salon_.jpg',
      'https://lh3.googleusercontent.com/p/AF1QipODfoH--4h9B3ZOgm6IoeH12_5ocBSy7Hs-4tOv=s680-w680-h510',
      'https://lh3.googleusercontent.com/p/AF1QipO-PbtD9Dsm9OwftUfuyT9cNoL8sdAhJWr1w_u2=s680-w680-h510',
    ]
  },
  creditCard: {
    number: '',
    expiry: '',
    cvc: '',
    name: '',
  }
};

// ==============================|| SLICE - addHairdresserForm ||============================== //

const addHairdresserForm = createSlice({
  name: 'addHairdresserForm',
  initialState,
  reducers: {
    persistHairdresser(state, action) {
      state.hairsalondetail = action.payload;
    },
    persistCardInfo(state, action) {
      state.creditCard = action.payload;
    },
    updateLocation(state, action) {
      state.hairsalondetail.latitude = action.payload.latitude;
      state.hairsalondetail.longitude = action.payload.longitude;
    }
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(onboardHairdresser.pending, (state) => {
        state.loading = true;
        console.log("pending");
      })
      .addCase(onboardHairdresser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        console.log("fulfilled");
      })
      .addCase(onboardHairdresser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log("rejected");
      });
  },
});

export const onboardHairdresser = createAsyncThunk(
  'api/hairsalons',
  async (userData, { rejectWithValue }) => {
    const geocoder = new window.google.maps.Geocoder();

    try {
      const geocodeResult = await new Promise((resolve, reject) => {
        geocoder.geocode({ 'address': userData.address }, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
              resolve(results[0].geometry.location);
          } else {
              console.error("Geocoding error:", status, results); // Logging more details
              reject(status);
          }
      });
      
      
      });

    // Create a new object based on userData
const updatedUserData = { ...userData };

// Attach the latitude and longitude to the updatedUserData
updatedUserData.latitude = geocodeResult.lat();
updatedUserData.longitude = geocodeResult.lng();

console.log("updatedUserData", updatedUserData);

      // Now send the userData to the backend
      const response = await axios.post('http://localhost:8080/api/hairsalons', updatedUserData);
      return response.data;
      
    } catch (error) {
      return rejectWithValue(error.message || 'Unable to retrieve location.');
    }
  }
);


export default addHairdresserForm.reducer;

export const { persistHairdresser, persistCardInfo, updateLocation  } = addHairdresserForm.actions;
