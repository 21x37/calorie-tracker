import React from 'react';
//------------------------------//
import CalorieSummary from './calorieComponents/CalorieSummary';
import AddCalorieItem from './calorieComponents/AddCalorieItem';
import SetGoal from './calorieComponents/SetGoal';
import CalorieItemList from './calorieComponents/CalorieItemList';
//------------------------------//
import NewsFeed from './newsFeedComponents/Newsfeed';
//---------------------------------//
import Header from './Header';
// --------------------------------- //
import TrendingList from './newsFeedComponents/TrendingList';

const DashboardPage = () => (
    <div className='dashboard-page-wrapper'>
        
        <div className='dashboard-page-container'>
                <TrendingList />
                <CalorieSummary />
                <div className='above-status-bar'></div> 
                <NewsFeed />
        </div>
    </div>
);





export default DashboardPage;