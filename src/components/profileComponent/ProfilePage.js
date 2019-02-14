import React from 'react';
import ProfilePageStatusList from './ProfilePageStatusList';
import PostStatus from '../newsFeedComponents/PostStatus';
import Header from '../Header';
import CalorieSummay from '../calorieComponents/CalorieSummary';

const ProfilePage = () => {
    return (
        <div>
            <Header />
            <CalorieSummay />
            <PostStatus />
            <ProfilePageStatusList />
        </div>
    )
}

export default ProfilePage;