import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWeather } from '../types/reduxEntityTypes';

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        cities: null
    },
    reducers: {
        setWeatherData: (state, action: PayloadAction<IWeather>) => {
            state.cities = action.payload;
        }
    }
});

export const { setWeatherData } = weatherSlice.actions;

export default weatherSlice.reducer;
