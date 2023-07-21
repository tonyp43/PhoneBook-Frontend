import { useState } from 'react';
import classes from './UpdateContact.module.css';

function UpdateContact({ contact, onUpdateContact }) {
    const [firstName, setFirstName] = useState(contact.firstName || '');
    const [lastName, setLastName] = useState(contact.lastName || '');
    const [phoneNumber, setPhoneNumber] = useState(contact.phoneNumber || '');
    const [email, setEmail] = useState(contact.email || '');
    const [socialNetworkLink, setSocialNetworkLink] = useState(contact.socialNetworkLink || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update the contact details using an API call
        // ...

        onUpdateContact();
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <label>
                First Name:
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </label>
            <label>
                Last Name:
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </label>
            <label>
                Phone Number:
                <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Social Network Link:
                <input type="text" value={socialNetworkLink} onChange={(e) => setSocialNetworkLink(e.target.value)} />
            </label>
            <button type="submit">Update Contact</button>
        </form>
    );
}

export default UpdateContact;
