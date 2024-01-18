import React, { useState, useEffect, useRef, Suspense, lazy, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFilter } from 'react-icons/fi';
import './styles.scss';
import DateRangePicker from '../cityFilters/dateRangePicker';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setWeatherData } from '../../redux/slices/weatherSlice';
import { setCityFilter, setFilteredWeatherData } from '../../redux/slices/filtersSlice';
import { ICity } from '../../redux/types/reduxEntityTypes';

const Modal = lazy(() => import('../partials/modal/index'));

const CityList = () => {
    const dispatch = useAppDispatch();
    const cities = useAppSelector(state => state.weather.cities);
    const filteredData = useAppSelector(state => state.filters.cities);
    const cityFilter = useAppSelector(state => state.filters.cityFilter);
    const [editColumn, setEditColumn] = useState(null);
    const handleCityFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
        const filterValue = event.target.value;
        dispatch(setCityFilter(filterValue));
        dispatch(setFilteredWeatherData(cities?.filter((city: ICity) =>
            city.name.toLowerCase().includes(filterValue.toLowerCase())
        )));
    };
    const inputRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const handleRowClick = (cityName: string) => {
        navigate(`/city/${cityName}`);
    };

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch('/weather.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                dispatch(setWeatherData(data.cities));
                dispatch(setFilteredWeatherData(data.cities));
            } catch (error) {
                console.log(error);
            }
        };

        fetchWeatherData();
    }, []);

    useEffect(() => {
        if (editColumn === 'city') {
            inputRef.current.focus();
        }
    }, [editColumn]);

    if (!cities) {
        return <div>Loading...</div>;
    }

    return (
        <div className="city-list-container">
            <table className="city-list-table">
                <thead>
                    <tr>
                        <th><span onClick={ () => setIsModalOpen(true) }>Date <FiFilter /></span></th>
                        <th>
                            { editColumn === 'city'
                                ? <input
                                    type="text"
                                    placeholder="City name"
                                    onBlur={ () => setEditColumn(null) }
                                    value={ cityFilter }
                                    ref={ inputRef }
                                    onChange={ handleCityFilterChange }
                                />
                                : <span onClick={ () => setEditColumn('city') }>City <FiFilter /></span> }
                        </th>
                        <th>Airport Code</th>
                        <th>Phone Code</th>
                        <th>Weather</th>
                    </tr>
                </thead>
                <tbody>
                    { filteredData && filteredData.map((city: ICity, index: number) => (
                        <tr key={ index.toString() } onClick={ () => handleRowClick(city.name) }>
                            <td>{ city.date }</td>
                            <td>{ city.name }</td>
                            <td>{ city.airportCode }</td>
                            <td>{ city.phoneCode }</td>
                            <td>{ city.weather }</td>
                        </tr>
                    )) }
                </tbody>
            </table>
            <Suspense fallback={ <div>Loading...</div> }>
                { isModalOpen && (
                    <Modal show={ isModalOpen } onClose={ () => setIsModalOpen(false) }>
                        <DateRangePicker />
                    </Modal>
                ) }
            </Suspense>
        </div>
    );
};

export default CityList;
