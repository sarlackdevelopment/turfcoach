import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICity {
    name: string;
    airportCode: string;
    phoneCode: string;
    weather: string;
}

interface IWeather {
    data: ICity[]
}

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        data: null
    },
    reducers: {
        setWeatherData: (state, action: PayloadAction<IWeather>) => {
            state.data = action.payload;
        }
    }
});

export const { setWeatherData } = weatherSlice.actions;

export default weatherSlice.reducer;
