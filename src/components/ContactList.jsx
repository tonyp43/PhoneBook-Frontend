import { useState, useEffect } from 'react';

import Contact from './Contact';
import NewContact from './NewContact';
import Modal from './Modal';
import classes from './ContactList.module.css';
import { hostUrl } from '../config/apiConfig';
import { getToken, fetchApiData, isTokenExpired } from '../services/authServices';
import axios from 'axios';
import UpdateModal from './UpdateModal';
import UpdateContact from './UpdateContact';

function ContactList({ isPosting, onStopPosting, isCreating }) {
    const [contacts, setContacts] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const [selectedContact, setSelectedContact] = useState(null); // Track the selected contact

    function showUpdateModalHandler(contact) {
        setSelectedContact(contact); // Set the selected contact when the "Update" button is clicked
    }

    function hideUpdateModalHandler() {
        setSelectedContact(null); // Clear the selected contact when the modal is closed
    }


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

    const addContactHandler = async (contactData) => {
        try {
            const response = await axios.post(hostUrl + '/api/Contact/CreateContact', contactData, {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setContacts((existingContacts) => [contactData, ...existingContacts]);
            } else {
                console.log('Request failed:', response.status);

            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const updateContactHandler = async (contactData) => {
        try {
            const response = await axios.post(
                hostUrl + '/api/Contact/Update?id=' + selectedContact.id,
                contactData,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                window.location.reload();
            } else {
                console.log('Request failed:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const deleteContactHandler = async () => {
        try {
            const response = await axios.delete(
                hostUrl + '/api/Contact/DeleteContact?id=' + selectedContact.id,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                window.location.reload();
            } else {
                console.log('Request failed:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <>
            {selectedContact && (
                <UpdateModal onClose={hideUpdateModalHandler}>
                    <UpdateContact contact={selectedContact} onUpdateContact={updateContactHandler} onDeleteContact={deleteContactHandler} />
                </UpdateModal>
            )}
            {isPosting && (
                <Modal onClose={onStopPosting}>
                    <NewContact onCancel={onStopPosting} onAddContact={addContactHandler} />
                </Modal>
            )}
            {!isFetching && contacts.length > 0 && (
                <ul className={classes.contacts} >
                    {contacts.map((contact) => (
                        <Contact key={contact.id} firstName={contact.firstName} lastName={contact.lastName} phoneNumber={contact.phoneNumber} email={contact.email} socialNetworkLink={contact.socialNetworkLink} onUpdate={() => showUpdateModalHandler(contact)} />
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