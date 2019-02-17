import React from 'react';
import ProfilePageStatusList from './ProfilePageStatusList';
import PostStatus from '../newsFeedComponents/PostStatus';
import Header from '../Header';
import CalorieSummay from '../calorieComponents/CalorieSummary';
import UserProfileInfo from './UserProfileInfo';
import PostStatusList from '../newsFeedComponents/PostStatusList';

const ProfilePage = () => {
    return (
        <div>
            <Header />
            <UserProfileInfo />
            <CalorieSummay />
            <PostStatus />
            <ProfilePageStatusList />
        </div>
    )
}

export default ProfilePage;