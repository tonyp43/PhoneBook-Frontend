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

    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    return (
        <li ref={ref} className={classes.contact} onClick={handleContactClick}>
            <div>
                <p className={classes.author}>{firstName + ' ' + lastName}</p>
                <a className={classes.text} href={`tel:${phoneNumber}`} onClick={stopPropagation}>
                    <MdPhone className={classes.icon} />
                    {phoneNumber}
                </a>
                <a className={classes.text} href={`mailto:${email}`} onClick={stopPropagation}>
                    <MdEmail className={classes.icon} />
                    {email}
                </a>
                <a
                    href={absoluteSocialNetworkLink}
                    className={classes.text}
                    onClick={stopPropagation}
                    target="_blank"
                >
                    <MdLink className={classes.icon} />
                    {socialNetworkLink}
                </a>
            </div>
        </li>
    );
});

export default Contact;
