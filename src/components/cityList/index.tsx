import React, { Suspense, lazy, ChangeEvent } from 'react';
import { FiFilter } from 'react-icons/fi';
import { BsStar, BsStarFill } from 'react-icons/bs';
import './styles.scss';
import DateRangePicker from '../cityFilters/dateRangePicker';
import { toggleFavoriteCity } from '../../redux/slices/weatherSlice';
import { setCityFilter, setFilteredWeatherData } from '../../redux/slices/filtersSlice';
import { ICity } from '../../redux/types/reduxEntityTypes';
import useLogic from './useLogic';

const Modal = lazy(() => import('../partials/modal/index'));

const CityList = () => {
    const {
        dispatch,
        cities,
        filteredData,
        cityFilter,
        favorites,
        editColumn,
        setEditColumn,
        filterFavorite,
        setFilterFavorite,
        isModalOpen,
        setIsModalOpen,
        navigate,
        inputRef
    } = useLogic();
    const handleCityFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
        const filterValue = event.target.value;
        dispatch(setCityFilter(filterValue));
        dispatch(setFilteredWeatherData(cities?.filter((city: ICity) =>
            city.name.toLowerCase().includes(filterValue.toLowerCase())
        )));
    };
    const handleFavorite = () => {
        setFilterFavorite((prev: boolean) => !prev);
        const intersection = cities.filter(city => favorites.includes(city.name));
        if (filterFavorite) {
            dispatch(setFilteredWeatherData(intersection));
        } else {
            dispatch(setFilteredWeatherData(cities));
        }
    }

    const handleFavoriteToggle = (cityName: string) => {
        dispatch(toggleFavoriteCity(cityName));
    };

    const handleRowClick = (cityName: string) => {
        navigate(`/city/${cityName}`);
    };

    if (!cities) {
        return <div>Loading...</div>;
    }

    return (
        <div className="city-list-container">
            <table className="city-list-table">
                <thead>
                    <tr>
                        <th><span onClick={ handleFavorite }>Favorite <FiFilter /></span></th>
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
                        <tr key={ index.toString() } >
                            <td onClick={ () => handleFavoriteToggle(city.name) }>
                                { favorites.includes(city.name) ? <BsStarFill /> : <BsStar /> }
                            </td>
                            <td onClick={ () => handleRowClick(city.name) }>{ city.date }</td>
                            <td onClick={ () => handleRowClick(city.name) }>{ city.name }</td>
                            <td onClick={ () => handleRowClick(city.name) }>{ city.airportCode }</td>
                            <td onClick={ () => handleRowClick(city.name) }>{ city.phoneCode }</td>
                            <td onClick={ () => handleRowClick(city.name) }>{ city.weather }</td>
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
