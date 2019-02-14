import React from 'react';

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

        });
    }
    render() {
        return (
            <div>
                {this.state.likes}<button onClick={this.onClick}>Like</button>
            </div>
        );
    };
};

export default LikeStatus;