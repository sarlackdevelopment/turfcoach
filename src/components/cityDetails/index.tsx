import React from 'react';
import './styles.scss';
import { useParams } from 'react-router-dom';

const CityDetails = () => {
    const { city } = useParams();
    return <>{ city }</>
};

export default CityDetails;
