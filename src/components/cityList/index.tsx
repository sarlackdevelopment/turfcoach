import React, { useState, useEffect } from 'react';
import './styles.scss';

const CityList = () => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch('/weather.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setWeatherData(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchWeatherData();
    }, []);

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
                        <th>City</th>
                        <th>Airport Code</th>
                        <th>Phone Code</th>
                        <th>Weather</th>
                    </tr>
                </thead>
                <tbody>
                    { currentDateWeather && currentDateWeather.cities.map((city: any, index: any) => (
                        <tr key={ index }>
                            <td>{ city.name }</td>
                            <td>{ city.airportCode }</td>
                            <td>{ city.phoneCode }</td>
                            <td>
                                <span className="weather-icon">[Icon]</span>
                                { city.weather }
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    );
};

export default CityList;
