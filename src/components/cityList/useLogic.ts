import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setWeatherData } from '../../redux/slices/weatherSlice';
import { setFilteredWeatherData } from '../../redux/slices/filtersSlice';

const useLogic = () => {
    const dispatch = useAppDispatch();
    const cities = useAppSelector(state => state.weather.cities);
    const filteredData = useAppSelector(state => state.filters.cities);
    const cityFilter = useAppSelector(state => state.filters.cityFilter);
    const favorites = useAppSelector(state => state.weather.favorites);

    const [editColumn, setEditColumn] = useState(null);
    const [filterFavorite, setFilterFavorite] = useState(true);
    const inputRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
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
    return {
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
    }
}

export default useLogic;
