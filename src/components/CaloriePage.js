import React from 'react';
import AddCalorieItem from './calorieComponents/AddCalorieItem';
import CalorieSummary from './calorieComponents/CalorieSummary';
import CalorieItemList from './calorieComponents/CalorieItemList';
import SetGoal from './calorieComponents/SetGoal';

const CaloriePage = () => {
    return (
        <div>
            <CalorieSummary />
            <AddCalorieItem />
            <SetGoal />
            <CalorieItemList />
        </div>
    );
};

export default CaloriePage;