import React from 'react';
import CalorieSummary from './CalorieSummary';
import AddCalorieItem from './AddCalorieItem';
import SetGoal from './SetGoal';


const DashboardPage = () => (
    <div>
        <CalorieSummary />
        <AddCalorieItem />
        <SetGoal />
    </div>
);

export default DashboardPage;