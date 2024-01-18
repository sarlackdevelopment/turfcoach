import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICity {
    date: string;
    name: string;
    airportCode: string;
    phoneCode: string;
    weather: string;
}

interface IWeather {
    cities: ICity[]
}

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
