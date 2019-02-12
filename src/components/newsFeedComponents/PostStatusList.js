import React from 'react';
import { connect } from 'react-redux';

const PostStatusList = (props) => {
    console.log(props.statusItem)
    return(
        <div>
            {props.statusItem.map(status => {
                return (
                    <div key={status.id}>
                        <h1>{status.description} : {status.createdAt}</h1>
                    </div>
                )
            })}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        statusItem: state.statusItem
    };
};

export default connect(mapStateToProps)(PostStatusList);

