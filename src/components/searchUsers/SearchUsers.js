import React from 'react';
import { connect } from 'react-redux';
import { startSearchUser, clearUser } from '../../actions/searchUser';
import { Link } from 'react-router-dom';

class SearchUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
        }
    };
    onChange = (e) => {
        const query = e.target.value;
        if (query !== '') {
            this.setState({ query }, () => {
                this.props.startSearchUser(this.state.query);
            });
        } else {
            (query === '') 
            this.props.clearUser();
        }
    };
    render() {
        return (
            <div>
                <input type='text' onChange={this.onChange} placeholder='Search Users'/>
                {this.props.searchUser.map(user => {
                    return (
                        
                        <div key={user.id}>
                            <Link to={`/profile/${user.id}`} onClick={() => {
                                this.props.clearUser();
                            }}>
                                <img src={user.picture} style={{width: '35px', height: '35px'}}/>{user.name}
                            </Link>   
                        </div>
                        
                    )
                })}
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    startSearchUser: (query) => dispatch(startSearchUser(query)),
    clearUser: () => dispatch(clearUser())
});

const mapStateToProps = (state) => ({
    searchUser: state.searchUser
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsers);