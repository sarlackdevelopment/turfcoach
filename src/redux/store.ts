import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import weatherReducer from './slices/weatherSlice';
import filtersReducer from './slices/filtersSlice';

export const store = configureStore({
    reducer: {
        weather: weatherReducer,
        filters: filtersReducer
    },
    devTools: true
});

export type TAppDispatch = typeof store.dispatch;
export type TStore = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TStore> = useSelector;

export default store;
