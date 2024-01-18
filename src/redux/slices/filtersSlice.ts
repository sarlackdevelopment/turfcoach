import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
    cityFilter: string;
    dateFilter: {
        startDate: string;
        endDate: string;
    };
}

const initialState: FiltersState = {
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
        }
    }
});

export const { setCityFilter, setDateFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
