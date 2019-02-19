import React from 'react';
import { connect } from 'react-redux';
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
            }).then((test) => {
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
                console.log(this.state.userLikesInfo.length);
                console.log(this.state.userLikesInfo[i].parentId, this.props.parentId)
                if(this.state.userLikesInfo[i].parentId == this.props.parentId) {
                    console.log(111111111)
                    this.setState(() => {
                        return {
                            disabled: true
                        };
                    });
                    this.props.startRemoveLike(this.props.currentUser.id, this.state.userLikesInfo[i].id, this.state.likes, this.props.parentId).then(() => {
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
            

        } //else if (this.state.likedBy.indexOf(this.props.currentUser.id) > 0) {
        //     this.props.startRemoveLike(this.props.currentUser.id, )
        // }
        console.log(this.likedBy);







        // console.log(this.state.userLikes);
        // console.log(!!this.state.userLikes);
        // if (!!this.state.userLikes) {
        //     console.log('test');
        //     this.props.startAddLike({
        //         likedBy: this.props.currentUser.id,
        //         parentId: this.props.parentId
        //     });
        //     this.setState((state) => {
        //         return {
        //             likes: state.likes + 1,
        //         }
        //     });
        // } else {
        //     this.state.userLikes.forEach(like => {
        //         console.log(like);
        //     })
        // }






        // if (this.state.userLikes !== []) {
        //     this.state.userLikes.forEach(like => {
        //         console.log(like);
        //     })
        // } else {
            // console.log('test');
            // this.props.startAddLike({
            //     likedBy: this.props.currentUser.id,
            //     parentId: this.props.parentId
            // });
            // this.setState((state) => {
            //     return {
            //         likes: state.likes + 1,
            //     }
            // });
        // }

        // console.log(this.state.userLikes);
        // this.state.userLikes.forEach(like => {
        //     console.log(like);
        // })

        // for (let i = 0 ; i < this.state.userLikes.length ; i++ ) {
        //     if(this.state.userLikes[i] === this.props.currentUser.id) {
        //         console.log('goodbye');
        //         this.setState((state) => {
        //             return {
        //                 likes: state.likes -1,
        //                 userLikes: state.userLikes.filter(likes => likes.likedBy !== this.props.currentUser.id)
        //             }
        //         });
        //     } else {
        //         console.log('hello');
                // this.props.startAddLike({
                //     likedBy: this.props.currentUser.id,
                //     parentId: this.props.parentId
                // });
                // this.setState((state) => {
                //     return {
                //         likes: state.likes + 1,
                //     }
                // })
        //     }
        // }
    };

    render() {
        console.log(this.state.likes);
        return (
            <div>
                {this.state.likes}{this.state.likes > 1 ? " Likes" : " Like"}<button onClick={this.onClick} disabled={this.state.disabled}>Like</button>
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    startSetLike: (location, parentId, likes) => dispatch(startSetLike(location, parentId, likes)),
    startAddLike: like => dispatch(startAddLike(like)),
    startRemoveLike: (currentUser, id, likeAmount, parentId) => dispatch(startRemoveLike(currentUser, id, likeAmount, parentId)),
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