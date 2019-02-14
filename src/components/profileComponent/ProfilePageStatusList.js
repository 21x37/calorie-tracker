import React from 'react';
import { connect } from 'react-redux';
import Comment from '../commentComponent/Comment';


const ProfilePageStatusList = (props) => {
    console.log(props.statusItem);
    return (
        <div>
            {props.statusItem.map(status => {
                return (
                    <div key={status.id}>
                        <p>{status.description}</p>
                        <Comment parentId={status.id}/>
                    </div>
                )
            })};
            <p>This is my proflie page</p>
        </div>
    )
};

const mapStateToProps = (state) => ({
    statusItem: state.statusItem
});

export default connect(mapStateToProps)(ProfilePageStatusList);

