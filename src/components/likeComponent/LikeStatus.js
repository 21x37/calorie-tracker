import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { startSetLike } from '../../actions/statusFeatures';
import { startAddLike, startRemoveLike } from '../../actions/like';
import alreadyLiked from '../../selectors/alreadyLiked';
import likeId from '../../selectors/likeId';
import database from '../../firebase/firebase';
import { startAddTotalLike } from '../../actions/totalLikes';

class LikeStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: parseInt(this.props.likesAmount), // TEMP
            liked: false,
            userLikes: this.props.userLikes.map(likes => likes.parentId),
            userLikesInfo: this.props.userLikes,
            totalLikes: this.props.totalLikes.map(totalLikes => totalLikes.parentId),
            disabled: false,
            likeId: ''
        };
        this.onClick = this.onClick.bind(this);
    };
    onClick() {
        if (this.state.userLikes.indexOf(this.props.parentId) === -1) {
            console.log('USER LIKES', this.state.userLikes)
            console.log('PARENT ID', this.props.parentId)
            this.setState(() => {
                return {
                    disabled: true
                }
            })
            this.props.startAddLike({
                likedBy: this.props.currentUser.id,
                parentId: this.props.parentId,
                likesAmount: this.props.likesAmount
            }, this.props.dbLocation, this.props.type).then((test) => {
                console.log('TEST', test);
                this.setState((state) => {
                    return {
                        likes: state.likes + 1,
                        userLikes: this.props.userLikes.map(likes => likes.parentId),
                        userLikesInfo: this.props.userLikes,
                        disabled: false
                    }
                });
            });
        } else {
            for (let i = 0; i < this.state.userLikesInfo.length; i++) {
                if(this.state.userLikesInfo[i].parentId == this.props.parentId) {
                    this.setState(() => {
                        return {
                            disabled: true
                        };
                    });
                    this.props.startRemoveLike(this.props.currentUser.id, this.state.userLikesInfo[i].id, this.state.likes, this.props.parentId, this.props.dbLocation, this.props.type).then(() => {
                        this.setState((state) => {
                            return {
                                likes: state.likes - 1,
                                userLikes: this.props.userLikes.map(likes => likes.parentId),
                                userLikesInfo: this.props.userLikes,
                                disabled: false
                            }
                        })
                    })
                }
            }

        }

        if (this.state.userLikes.indexOf(this.props.currentUser.id) === -1) {
            

        } 
        console.log(this.likedBy);
    };

    render() {
        console.log(this.state.likes);
        const id = uuid();
        if (window.location.href.split('/')[3] === 'profile') {
            return (
                <div>
                    {parseInt(this.props.likesAmount)}{this.state.likes > 1 ? " Likes" : " Like"}<button hidden={true} id={id} onClick={this.onClick} disabled={this.state.disabled}>Like</button>
                    <label htmlFor={id}><div><div className='profile-status-like-icon'><ion-icon style={{cursor: 'pointer'}} name="thumbs-up"></ion-icon></div></div></label>
                </div>
            );
        } else if (window.location.href.split('/')[3] === '') {
            return (
                <div className='dashboard-like-profile-container'>
                    <p className='dashboard-like-amount'>{parseInt(this.props.likesAmount)}{this.state.likes > 1 ? " Likes" : " Like"}</p><button hidden={true} id={id} onClick={this.onClick} disabled={this.state.disabled}>Like</button>
                    <label htmlFor={id}><div className='dashboard-like-label-wrapper'><div className='dashbboard-like-label-icon'><ion-icon className='like-label-icon' style={{cursor: 'pointer'}} name="thumbs-up"></ion-icon></div></div></label>
                </div>
            )
        }

    };
};

const mapDispatchToProps = (dispatch) => ({
    startSetLike: (location, parentId, likes) => dispatch(startSetLike(location, parentId, likes)),
    startAddLike: (like, dbLocation, type) => dispatch(startAddLike(like, dbLocation, type)),
    startRemoveLike: (currentUser, id, likeAmount, parentId, dbLocation, type) => dispatch(startRemoveLike(currentUser, id, likeAmount, parentId, dbLocation, type)),
    startAddTotalLike: (like) => dispatch(startAddTotalLike(like))
});

const mapStateToProps = (state) => ({
    currentUser: state.currentUser,
    statusItem: state.statusItem,
    userLikes: state.userLikes,
    totalLikes: state.totalLikes
});

export default connect(mapStateToProps, mapDispatchToProps)(LikeStatus);




// this.props.startRemoveLike(this.props.currentUser.id, this.state.likeId).then(() => {
//     this.setState({liked: alreadyLiked(this.props.currentUser, this.props.parentId)})
// });




// database.ref(`users/${this.props.currentUser.id}/likes`).once('value').then((snapshot) => {
//     console.log('11')
//     snapshot.forEach((childSnapshot) => {
//         if (childSnapshot.val().parentId === this.props.parentId) {
//             console.log('22');
//             this.setState({likeId: childSnapshot.key})
//         };
//     });
// });