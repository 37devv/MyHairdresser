// types
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// initial state
const initialState = {
  name: '',
  description: '',

};

// ==============================|| SLICE - addHairdresserForm ||============================== //

const addHairdresserForm = createSlice({
  name: 'addHairdresserForm',
  initialState,
  reducers: {
    addHairdresser(state, action) {
      state.name = action.payload.name;
      state.description = action.payload.description;
    },

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

export const onboardHairdresser = createAsyncThunk('api/hairdresser', async (userData) => {
  const response = await axios.post('http://localhost:8080/hairdressers', userData);
  return response.data;
});

export default addHairdresserForm.reducer;

export const { addHairdresser } = addHairdresserForm.actions;
