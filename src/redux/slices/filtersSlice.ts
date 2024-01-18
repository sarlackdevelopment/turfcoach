import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICity, IFiltersState } from '../types/reduxEntityTypes';

const initialState: IFiltersState = {
    cities: null,
    cityFilter: '',
    dateFilter: {
        startDate: '',
        endDate: ''
    }
};

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCityFilter: (state, action: PayloadAction<string>) => {
            state.cityFilter = action.payload;
        },
        setDateFilter: (state, action: PayloadAction<{ startDate: string; endDate: string }>) => {
            state.dateFilter = action.payload;
        },
        setFilteredWeatherData: (state, action: PayloadAction<ICity[]>) => {
            state.cities = action.payload;
        }
    }
});

export const { setCityFilter, setDateFilter, setFilteredWeatherData } = filtersSlice.actions;

export default filtersSlice.reducer;
