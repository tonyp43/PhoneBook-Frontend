// UpdateModal.js

import React from 'react';
import classes from './UpdateModal.module.css';

const UpdateModal = ({ onClose, children }) => {
    return (
        <>
            <div className={classes.backdrop} onClick={onClose} />
            <dialog open className={classes.modal}>
                {children}
            </dialog>
        </>
    );
};

export default UpdateModal;
