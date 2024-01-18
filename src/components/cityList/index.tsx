import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFilter } from 'react-icons/fi';
import './styles.scss';
import DateRangePicker from '../cityFilters/dateRangePicker';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setWeatherData } from '../../redux/slices/weatherSlice';

const Modal = React.lazy(() => import('../partials/modal/index'));

const CityList = () => {
    const dispatch = useAppDispatch();
    const weatherData = useAppSelector(state => state.weather.data);
    const [editColumn, setEditColumn] = useState(null);
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
                dispatch(setWeatherData(data));
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

    if (!weatherData) {
        return <div>Loading...</div>;
    }

    // Assuming that the weather data for the specific date is already in the expected format
    const currentDateWeather = weatherData.find((data: any) => data.date === '2024-01-01');

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
                                    ref={ inputRef }
                                />
                                : <span onClick={ () => setEditColumn('city') }>City <FiFilter /></span> }
                        </th>
                        <th>Airport Code</th>
                        <th>Phone Code</th>
                        <th>Weather</th>
                    </tr>
                </thead>
                <tbody>
                    { currentDateWeather && currentDateWeather.cities.map((city: any, index: any) => (
                        <tr key={ index } onClick={ () => handleRowClick(city.name) }>
                            <td>{ currentDateWeather.date }</td>
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
