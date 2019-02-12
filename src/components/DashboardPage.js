import React from 'react';
//------------------------------//
import CalorieSummary from './calorieComponents/CalorieSummary';
import AddCalorieItem from './calorieComponents/AddCalorieItem';
import SetGoal from './calorieComponents/SetGoal';
import CalorieItemList from './calorieComponents/CalorieItemList';
//------------------------------//
import NewsFeed from './newsFeedComponents/Newsfeed';

const DashboardPage = () => (
    <div>
        <CalorieSummary />
        <AddCalorieItem />
        <SetGoal />
        <CalorieItemList />
        <NewsFeed />
    </div>
);





export default DashboardPage;