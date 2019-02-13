import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import moment from 'moment'
import { addStatus } from '../../actions/postStatus';

class PostStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            description: '',
            createdAt: '',
        
        }
    };
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState({ description });
    };
    onSubmit = (e) => {
        e.preventDefault();
        const date = moment();
        // DISPATCH POSTSTATUS STATE TO REDUX STATE
        this.props.addStatus({
            id: uuid(),
            description: this.state.description,
            createdAt: date.format()
        });
        const form = document.getElementById('postStatusForm');
        form.reset();
    };
    onAccept = (e) => {

    }
    render() {
        return (
            <div>
                <h2>Post a Status!</h2>
                <form id='postStatusForm' onSubmit={this.onSubmit}>
                    <input type='text' onChange={this.onDescriptionChange}/>
                    <button>Post!</button>
                </form>
            </div>
        )
    };
};


const mapDispatchToProps = (dispatch) => ({
    addStatus: (statusObj) => dispatch(addStatus(statusObj))
});

export default connect(undefined, mapDispatchToProps)(PostStatus);