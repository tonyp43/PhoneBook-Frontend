import classes from './Contact.module.css';

function Contact({ firstName, lastName, phoneNumber, email, socialNetworkLink }) {
    return (
        <li className={classes.contact}>
            <p className={classes.author}>{firstName + " " + lastName}</p>
            <p className={classes.text}>{phoneNumber}</p>
            <p className={classes.text}>{email}</p>
            <p className={classes.text}>{socialNetworkLink}</p>

        </li>
    );
}

export default Contact;