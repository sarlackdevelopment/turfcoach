import React, { ChangeEvent } from 'react';
import './styles.scss';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { setDateFilter, setFilteredWeatherData } from '../../../redux/slices/filtersSlice';
import { ICity } from '../../../redux/types/reduxEntityTypes';

const DateRangePicker = () => {
    const dispatch = useAppDispatch();
    const { startDate, endDate } = useAppSelector(state => state.filters.dateFilter);
    const cities = useAppSelector(state => state.weather.cities);

    const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const filterValue = event.target.value;
        dispatch(setDateFilter({ startDate: filterValue, endDate }));
        dispatch(setFilteredWeatherData(cities?.filter((city: ICity) =>
            city.date >= filterValue
        )));
    };

    const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const filterValue = event.target.value;
        dispatch(setDateFilter({ startDate, endDate: filterValue }));
        dispatch(setFilteredWeatherData(cities?.filter((city: ICity) =>
            city.date <= filterValue
        )));
    };

    return (
        <div>
            <label className='mr-1'>
                <span className='mr-1'>from:</span>
                <input type="date" value={ startDate } onChange={ handleStartDateChange } />
            </label>
            <label>
                <span className='mr-1'>from:</span>
                <input type="date" value={ endDate } onChange={ handleEndDateChange } />
            </label>
        </div>
    );
};

export default DateRangePicker;
