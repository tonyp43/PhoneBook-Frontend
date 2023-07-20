import { useState, useEffect } from 'react';

import Contact from './Contact';
import NewContact from './NewContact';
import Modal from './Modal';
import classes from './ContactList.module.css';
import { hostUrl } from '../config/apiConfig';
import { getToken, fetchApiData, isTokenExpired } from '../services/authServices';
import axios from 'axios';

function ContactList({ isPosting, onStopPosting }) {
    const [contacts, setContacts] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const fetchContacts = async () => {
            setIsFetching(true);
            try {
                if (!getToken() || isTokenExpired()) {
                    // Token is not available or expired, redirect to login or perform any other action
                    // Example: history.push('/login'); // if you are using React Router
                    return;
                }

                const response = await axios.get(hostUrl + '/api/Contact/GetContacts', {
                    headers: {
                        'Authorization': `Bearer ${getToken()}`,
                        'Content-Type': 'application/json',
                    },
                });


                if (response.status === 200) {
                    const data = response.data
                    setContacts(data);
                } else {
                    throw new Error('Failed to fetch contacts');
                }
            } catch (error) {
                console.error(error);
                // Handle the error state appropriately, e.g., display an error message.
            }
            setIsFetching(false);
        };

        fetchContacts();
    }, []);

    function addContactHandler(contactData) {
        fetch('https://localhost:7284/admin/post/create', {
            method: 'POST',
            body: JSON.stringify(contactData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    // Request succeeded
                    setContacts((existingContacts) => [contactData, ...existingContacts]);
                } else {
                    // Request failed
                    console.log('Request failed:', response.status);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            {isPosting && (
                <Modal onClose={onStopPosting}>
                    <NewContact onCancel={onStopPosting} onAddContact={addContactHandler} />
                </Modal>
            )}
            {!isFetching && contacts.length > 0 && (
                <ul className={classes.contacts} >
                    {contacts.map((contact) => (
                        <Contact key={contact.id} firstName={contact.firstName} lastName={contact.lastName} phoneNumber={contact.phoneNumber} email={contact.email} socialNetworkLink={contact.socialNetworkLink} />
                    ))}
                </ul>
            )}
            {!isFetching && contacts.length === 0 && (
                <div style={{ textAlign: 'center', color: 'white', backgroundColor: '#7f50e4' }}>
                    <h2>There are no contacts yet.</h2>
                    <p>Start adding some!</p>
                </div>
            )}
            {isFetching && (
                <div style={{ textAlign: 'center', color: 'white', backgroundColor: '#7f50e4' }}>
                    <p>Loading contacts...</p>
                </div>
            )}
        </>
    );
}

export default ContactList;