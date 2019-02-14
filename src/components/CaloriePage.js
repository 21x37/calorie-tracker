import React from 'react';
import Header from './Header';
import AddCalorieItem from './calorieComponents/AddCalorieItem';
import CalorieSummary from './calorieComponents/CalorieSummary';
import CalorieItemList from './calorieComponents/CalorieItemList';
import SetGoal from './calorieComponents/SetGoal';

const CaloriePage = () => {
    return (
        <div>
        <Header />
        <CalorieSummary />
        <AddCalorieItem />
        <SetGoal />
        <CalorieItemList />
        Calorie Page
        </div>
    );
};

export default CaloriePage;