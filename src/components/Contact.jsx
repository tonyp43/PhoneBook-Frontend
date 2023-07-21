import classes from './Contact.module.css';
import { MdPhone, MdEmail, MdLink } from 'react-icons/md';

function Contact({ firstName, lastName, phoneNumber, email, socialNetworkLink, onUpdate }) {
    // Check if socialNetworkLink is an absolute URL, if not, prepend "https://"
    const absoluteSocialNetworkLink =
        socialNetworkLink.startsWith('http://') || socialNetworkLink.startsWith('https://')
            ? socialNetworkLink
            : 'https://' + socialNetworkLink;

    return (
        <li className={classes.contact} onClick={onUpdate}> {/* Add onClick to the li element */}
            <div>
                <p className={classes.author}>{firstName + ' ' + lastName}</p>
                <p className={classes.text}><MdPhone className={classes.icon} />{phoneNumber}</p>
                <p className={classes.text}><MdEmail className={classes.icon} />{email}</p>
                <a href={absoluteSocialNetworkLink} className={classes.text}><MdLink className={classes.icon} />{socialNetworkLink}
                </a>
            </div>
        </li>
    );
}

export default Contact;
