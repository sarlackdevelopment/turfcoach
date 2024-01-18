import React from 'react';
import CityList from '../cityList';
import './styles.scss';

const App = () => {
    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Weather App</h1>
            </header>

            <main className="app-content">
                <CityList />
            </main>

            <footer className="app-footer">
                <p>&copy; { new Date().getFullYear() } Weather App</p>
            </footer>
        </div>
    );
};

export default App;
