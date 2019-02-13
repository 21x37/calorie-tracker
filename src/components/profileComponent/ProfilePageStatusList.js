import React from 'react';
import { connect } from 'react-redux';
import PostStatus from '../newsFeedComponents/PostStatus';

const ProfilePageStatusList = (props) => {
    console.log(props.statusItem);
    return (
        <div>
            <PostStatus />
            {props.statusItem.map(status => {
                return (
                    <div key={status.id}>
                        <p>{status.description}</p>
                    </div>
                )
            })}
            <p>This is my proflie page</p>
        </div>
    )
};

const mapStateToProps = (state) => ({
    statusItem: state.statusItem
})

export default connect(mapStateToProps)(ProfilePageStatusList);

