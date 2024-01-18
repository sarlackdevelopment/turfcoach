import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import weatherReducer from './slices/weatherSlice';

export const store = configureStore({
    reducer: {
        weather: weatherReducer
    },
    devTools: true
});

export type TAppDispatch = typeof store.dispatch;
export type TStore = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TStore> = useSelector;

export default store;
