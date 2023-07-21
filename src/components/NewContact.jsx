import { useState } from 'react';

import classes from './NewContact.module.css';
import { hostUrl } from '../config/apiConfig';
import { getToken } from '../services/authServices';

function NewContact({ onCancel, onAddContact }) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { firstName, lastName, phoneNumber, email, socialNetworkLink } = event.target.elements;

        setIsSubmitting(true);

        const contactData = {
            firstName: firstName.value,
            lastName: lastName.value,
            phoneNumber: phoneNumber.value,
            email: email.value,
            socialNetworkLink: socialNetworkLink.value,
        };

        onAddContact(contactData);
        onCancel();

    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <p>
                <label htmlFor="firstName">First name</label>
                <input type="text" name="firstName" id="firstName" />
            </p>
            <p>
                <label htmlFor="lastName">Last name</label>
                <input type="text" name="lastName" id="lastName" required />
            </p>
            <p>
                <label htmlFor="phoneNumber">Phone number</label>
                <input type="text" name="phoneNumber" id="phoneNumber" required />
            </p>
            <p>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required />
            </p>
            <p>
                <label htmlFor="socialNetworkLink">Social network link</label>
                <input type="text" id="socialNetworkLink" required />
            </p>
            <p className={classes.actions}>
                <button type="button" onClick={onCancel} disabled={isSubmitting} >
                    Cancel
                </button>
                <button disabled={isSubmitting}>Submit</button>
            </p>
        </form>
    );
}

export default NewContact;