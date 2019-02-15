import React from 'react';
import { connect } from 'react-redux';
import Comment from '../commentComponent/Comment';
import LikeStatus from '../likeComponent/LikeStatus';


const ProfilePageStatusList = (props) => {
    console.log(props.statusItem);
    return (
        <div>
            {props.statusItem.map(status => {
                return (
                    <div key={status.id}>
                        <h2>{status.description}</h2>
                        <LikeStatus dbLocation={'statusItem'} parentId={status.id} likes={status.likes} />
                        <Comment parentId={status.id}/>
                    </div>
                )
            })}
        </div>
    )
};

const mapStateToProps = (state) => ({
    statusItem: state.statusItem
});

export default connect(mapStateToProps)(ProfilePageStatusList);

