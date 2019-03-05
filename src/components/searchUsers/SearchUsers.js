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
            <div className='content-container'>
                <input id='search-users' type='text' className='header__search search' onChange={this.onChange} placeholder='Search Users'/>
                <div className='search-results-container'>
                {this.props.searchUser.map(user => {
                    return (
                        <div key={user.id}>
                            <Link className='search__flex' to={`/profile/${user.id}`} onClick={() => {
                                this.props.clearUser();
                            }} >
                                <div className='search-results'>
                                    <div className='search-container'>
                                            <img className='search-results__icon' src={user.picture} style={{width: '35px', height: '35px'}}/>
                                            <p className='search-results__name'>{user.name}</p>   
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )
                })}
                </div>
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