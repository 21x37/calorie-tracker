import React from 'react';
import { connect } from 'react-redux';
import ModalImage from 'react-modal-image';

const UserPhotoList = (props) => {
    return (
        <div style={{position: 'relative'}} className='photo-list-wrapper'>
            <div className='photo-list-container'>
                {props.statusItem.map((status) => {
                    if (status.createdBy === props.user.id && status.type === 'image') {
                        return (
                            <div className='photo-list-modal-wrapper'>
                                <ModalImage className='photo-list-image' key={status.id} small={status.url} large={status.url} />
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    statusItem: state.statusItem
})

export default connect(mapStateToProps)(UserPhotoList);