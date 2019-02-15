import React from 'react';
import { connect } from 'react-redux';
import { startSetLike } from '../../actions/statusFeatures';

class LikeStatus extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.likes);
        this.state = {
            likes: this.props.likes,
            liked: false
        }
        this.onClick = this.onClick.bind(this);
    };
    onClick() {
        this.setState((state) => {
            if (this.state.liked) {
                return {
                    likes: state.likes -1,
                    liked: false
                }
            } else {
                return {
                    likes: state.likes + 1,
                    liked: true
                }
            }
            
        }, () => {
            this.props.startSetLike(this.props.dbLocation, this.props.parentId, this.state.likes);
        });

    };

    render() {
        return (
            <div>
                {this.state.likes}<button onClick={this.onClick}>Like</button>
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    startSetLike: (location, parentId, likes) => dispatch(startSetLike(location, parentId, likes))
})

export default connect(undefined, mapDispatchToProps)(LikeStatus);