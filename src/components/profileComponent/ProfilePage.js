import React from 'react';
import ProfilePageStatusList from './ProfilePageStatusList';
import Header from '../Header';
import CalorieSummay from '../calorieComponents/CalorieSummary';
import UserProfileInfo from './UserProfileInfo';
import PostStatusList from '../newsFeedComponents/PostStatusList';

const ProfilePage = () => {
    return (
        <div>
            <Header />
            <UserProfileInfo />
            <ProfilePageStatusList />
        </div>
    )
}


// <CalorieSummay />
export default ProfilePage;