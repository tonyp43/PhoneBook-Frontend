import { useEffect, useState } from 'react';
import classes from './UpdateContact.module.css';

function UpdateContact({ contact, onUpdateContact, onDeleteContact }) {
    const [firstName, setFirstName] = useState(contact.firstName || '');
    const [lastName, setLastName] = useState(contact.lastName || '');
    const [phoneNumber, setPhoneNumber] = useState(contact.phoneNumber || '');
    const [email, setEmail] = useState(contact.email || '');
    const [socialNetworkLink, setSocialNetworkLink] = useState(contact.socialNetworkLink || '');

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Set the form inputs with the contact details when the contact prop changes
        setFirstName(contact.firstName || '');
        setLastName(contact.lastName || '');
        setPhoneNumber(contact.phoneNumber || '');
        setEmail(contact.email || '');
        setSocialNetworkLink(contact.socialNetworkLink || '');
    }, [contact]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const contactData = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            email: email,
            socialNetworkLink: socialNetworkLink,
        };

        setIsSubmitting(true);
        onUpdateContact(contactData);
    };

    const handleDelete = async () => {
        onDeleteContact(contact);
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit} >
            <p>
                <label htmlFor="firstName">First name</label>
                <input type="text" name="firstName" id="firstName" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </p>
            <p>
                <label htmlFor="lastName">Last name</label>
                <input type="text" name="lastName" id="lastName" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </p>
            <p>
                <label htmlFor="phoneNumber">Phone number</label>
                <input type="text" name="phoneNumber" id="phoneNumber" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </p>
            <p>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </p>
            <p>
                <label htmlFor="socialNetworkLink">Social network link</label>
                <input type="text" name="socialNetworkLink" id="socialNetworkLink" required value={socialNetworkLink} onChange={(e) => setSocialNetworkLink(e.target.value)} />
            </p>
            <p className={classes.actions}>
                <button type="button" >
                    Cancel
                </button>
                <button type="submit" >Update</button>
                <button type="button" onClick={handleDelete} >Delete</button>
            </p>
        </form>
    );
}

export default UpdateContact;
