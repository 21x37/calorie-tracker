import React from 'react';
import ProfilePageStatusList from './ProfilePageStatusList';
import UserProfileInfo from './UserProfileInfo';
import PostStatusList from '../newsFeedComponents/PostStatusList';

const ProfilePage = () => {
    return (
        <div>
            <UserProfileInfo />
            <ProfilePageStatusList />
        </div>
    )
}

export default ProfilePage;