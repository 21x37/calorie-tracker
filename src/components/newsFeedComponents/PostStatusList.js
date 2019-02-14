import React from 'react';
import { connect } from 'react-redux';
import { startDeleteStatus } from '../../actions/postStatus';
import Comment from '../commentComponent/Comment';

class PostStatusList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                {this.props.statusItem.map(status => {
                    return (
                        <div key={status.id}>
                            <h1>{status.description} : {status.createdAt}</h1>
                            <button onClick={() => {
                                this.props.startDeleteStatus({id: status.id})
                            }}>Delete</button>
                            <Comment parentId={status.id}/>
                        </div>
                    )
                })}
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        startDeleteStatus: statusItem => dispatch(startDeleteStatus(statusItem))
    };

};

const mapStateToProps = (state) => {
    return {
        statusItem: state.statusItem
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostStatusList);

