import React from 'react';
import CityList from '../cityList';
import { Route, Routes } from 'react-router-dom';
import './styles.scss';
import CityDetails from '../cityDetails';

const App = () => {
    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Weather App</h1>
            </header>

            <main className="app-content">
                <Routes>
                    <Route path="/" element={ <CityList /> } />
                    <Route path="/city/:city" element={ <CityDetails /> } />
                </Routes>
            </main>

            <footer className="app-footer">
                <p>&copy; { new Date().getFullYear() } Weather App</p>
            </footer>
        </div>
    );
};

export default App;
