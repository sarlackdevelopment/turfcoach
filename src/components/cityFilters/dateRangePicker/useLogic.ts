import { useAppDispatch, useAppSelector } from '../../../redux/store';


const useLogic = () => {
    const dispatch = useAppDispatch();
    const { startDate, endDate } = useAppSelector(state => state.filters.dateFilter);
    const cities = useAppSelector(state => state.weather.cities);
    return {
        dispatch,
        cities,
        startDate,
        endDate
    }
}

export default useLogic;
