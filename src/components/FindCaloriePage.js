import React from 'react';
import axios from 'axios';
import {appID, apiKey} from '../../apiKey';

//https://api.edamam.com/api/food-database/nutrients

axios.get(`https://api.nutritionix.com/v1_1/search/chicken?results=0:20&appId=${appID}&appKey=${apiKey}`)
    .then((res) => {
    })

//https://api.nutritionix.com/v1_1/search?q=chicken

const FindCaloriePage = () => {
    return (
        <div></div>
    )
};

export default FindCaloriePage;