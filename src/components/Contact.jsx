import classes from './Contact.module.css';
import { MdPhone, MdEmail, MdLink } from 'react-icons/md';

function Contact({ firstName, lastName, phoneNumber, email, socialNetworkLink, onUpdate }) {
    // Check if socialNetworkLink is an absolute URL, if not, prepend "https://"
    const absoluteSocialNetworkLink =
        socialNetworkLink.startsWith('http://') || socialNetworkLink.startsWith('https://')
            ? socialNetworkLink
            : 'https://' + socialNetworkLink;

    // Define a separate click handler for the social media link
    const onSocialNetworkLinkClick = (event) => {
        event.stopPropagation(); // Prevent the click event from bubbling to the parent Contact element
    };

    return (
        <li className={classes.contact} onClick={onUpdate}>
            <div>
                <p className={classes.author}>{firstName + ' ' + lastName}</p>
                <p className={classes.text}><MdPhone className={classes.icon} />{phoneNumber}</p>
                <p className={classes.text}><MdEmail className={classes.icon} />{email}</p>
                <a
                    href={absoluteSocialNetworkLink}
                    className={classes.text}
                    onClick={onSocialNetworkLinkClick} // Attach the onClick handler to the link
                >
                    <MdLink className={classes.icon} />{socialNetworkLink}
                </a>
            </div>
        </li>
    );
}

export default Contact;
