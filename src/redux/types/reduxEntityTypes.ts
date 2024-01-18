// Basic structure
export interface ICity {
    date: string;
    name: string;
    airportCode: string;
    phoneCode: string;
    weather: string;
}

export interface IWeather {
    cities: ICity[]
}

// Filters
export interface IFiltersState {
    cities: ICity[] | null;
    cityFilter: string;
    dateFilter: {
        startDate: string;
        endDate: string;
    };
}

