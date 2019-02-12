import React from 'react';
import CalorieSummary from './CalorieSummary';
import AddCalorieItem from './AddCalorieItem';
import SetGoal from './SetGoal';
import CalorieItemList from './CalorieItemList';

const DashboardPage = () => (
    <div>
        <CalorieSummary />
        <AddCalorieItem />
        <SetGoal />
        <CalorieItemList />
    </div>
);

export default DashboardPage;