import React, { useState } from 'react';
import './styles.scss';

const DateRangePicker = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleStartDateChange = (e: any) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e: any) => {
        setEndDate(e.target.value);
    };

    return (
        <div>
            <label>
                from:
                <input type="date" value={ startDate } onChange={ handleStartDateChange } />
            </label>
            <label>
                to:
                <input type="date" value={ endDate } onChange={ handleEndDateChange } />
            </label>
        </div>
    );
};

export default DateRangePicker;
