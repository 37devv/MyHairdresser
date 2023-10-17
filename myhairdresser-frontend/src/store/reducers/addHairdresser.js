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
    address: "Europa-Strasse 18, Opfikon, Switzerland",
    openingTimes: [
       { morningFrom: '08:00', morningTo: '12:00', afternoonFrom: '13:00', afternoonTo: '17:00', closed: false, day: 1 },
       { morningFrom: '08:00', morningTo: '12:00', afternoonFrom: '13:00', afternoonTo: '17:00', closed: false, day: 2 },
       { morningFrom: '08:00', morningTo: '12:00', afternoonFrom: '13:00', afternoonTo: '17:00', closed: false, day: 3  },
       { morningFrom: '08:00', morningTo: '12:00', afternoonFrom: '13:00', afternoonTo: '17:00', closed: false, day: 4  },
       { morningFrom: '08:00', morningTo: '12:00', afternoonFrom: '13:00', afternoonTo: '17:00', closed: false, day: 5  },
       { morningFrom: '', morningTo: '', afternoonFrom: '', afternoonTo: '', closed: true, day: 6  },
       { morningFrom: '', morningTo: '', afternoonFrom: '', afternoonTo: '', closed: true, day: 7  },
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

export const onboardHairdresser = createAsyncThunk('api/hairsalons', async (userData) => {
  const response = await axios.post('http://localhost:8080/api/hairsalons', userData);
  return response.data;
});

export default addHairdresserForm.reducer;

export const { persistHairdresser, persistCardInfo } = addHairdresserForm.actions;
