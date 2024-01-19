import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICity } from '../types/reduxEntityTypes';

interface WeatherState {
    cities: ICity[];
    favorites: string[];
}

const initialState: WeatherState = {
    cities: null,
    favorites: []
};

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setWeatherData: (state, action: PayloadAction<ICity[]>) => {
            state.cities = action.payload;
        },
        toggleFavoriteCity: (state, action: PayloadAction<string>) => {
            const city = action.payload;
            const index = state.favorites.indexOf(city);
            if (index >= 0) {
                state.favorites.splice(index, 1);
            } else {
                state.favorites.push(city);
            }
        }
    }
});

export const { setWeatherData, toggleFavoriteCity } = weatherSlice.actions;

export default weatherSlice.reducer;
