import React from 'react';
import ProfilePageStatusList from './ProfilePageStatusList';
import Header from '../Header';
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

export default ProfilePage;