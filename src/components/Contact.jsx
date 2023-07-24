import classes from '../styles/Contact.module.css';
import { MdPhone, MdEmail, MdLink } from 'react-icons/md';
import React, { forwardRef } from 'react';

const Contact = forwardRef(({ firstName, lastName, phoneNumber, email, socialNetworkLink, onUpdate, onClickDropdownItem }, ref) => {
    // Check if socialNetworkLink is an absolute URL, if not, prepend "https://"
    const absoluteSocialNetworkLink =
        socialNetworkLink.startsWith('http://') || socialNetworkLink.startsWith('https://')
            ? socialNetworkLink
            : 'https://' + socialNetworkLink;

    // Handle the contact click and pass the contact data to onUpdate
    const handleContactClick = () => {
        onUpdate();
        onClickDropdownItem();
    };

    return (
        <li ref={ref} className={classes.contact} onClick={handleContactClick}>
            <div>
                <p className={classes.author}>{firstName + ' ' + lastName}</p>
                <p className={classes.text}><MdPhone className={classes.icon} />{phoneNumber}</p>
                <p className={classes.text}><MdEmail className={classes.icon} />{email}</p>
                <a
                    href={absoluteSocialNetworkLink}
                    className={classes.text}
                    onClick={(event) => {
                        event.stopPropagation(); // Prevent the click event from bubbling to the parent Contact element
                    }}
                >
                    <MdLink className={classes.icon} />{socialNetworkLink}
                </a>
            </div>
        </li>
    );
});

export default Contact;