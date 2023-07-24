import { useState, useEffect, useRef } from 'react';
import Contact from './Contact';
import NewContact from './NewContact';
import Modal from './Modal';
import classes from './ContactList.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateModal from './UpdateModal';
import UpdateContact from './UpdateContact';
import ContactSearch from './ContactSearch';
import * as apiServices from '../services/apiServices';

function ContactList({ isPosting, onStopPosting, isCreating }) {
    const [contacts, setContacts] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [showUpdateContact, setShowUpdateContact] = useState(false);

    const newContactRef = useRef(null); // Ref for the new contact element

    function showUpdateModalHandler(contact) {
        setSelectedContact(contact);
        setShowUpdateContact(true); // Open the UpdateContact component
    }

    function hideUpdateModalHandler() {
        setSelectedContact(null);
        setShowUpdateContact(false); // Close the UpdateContact component
    }

    const handleContactSelect = (contact) => {
        setSelectedContact(contact);
        setShowUpdateContact(true);
    };

    useEffect(() => {
        const fetchContacts = async () => {
            setIsFetching(true);
            try {
                const data = await apiServices.fetchContacts();
                setContacts(data);
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
            const success = await apiServices.addContact(contactData);
            if (success) {
                // Fetch the updated list of contacts after adding a new contact
                const updatedContacts = await apiServices.fetchContacts();
                setContacts(updatedContacts);
                toast.success('Contact added successfully', {
                    position: toast.POSITION.TOP_RIGHT,
                });

                // Scroll to the new contact after it's created
                if (newContactRef.current) {
                    newContactRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    });
                }
            }
        } catch (error) {
            console.error(error);
            // Handle the error state appropriately, e.g., display an error message.
        }
    };

    const updateContactHandler = async (contactData) => {
        const success = await apiServices.updateContact(contactData, selectedContact.id);
        if (success) {
            setContacts((prevContacts) =>
                prevContacts.map((contact) =>
                    contact.id === selectedContact.id ? { ...contact, ...contactData } : contact
                )
            );
            toast.success('Update successful', {
                position: toast.POSITION.TOP_RIGHT,
            });
            hideUpdateModalHandler();
        }
    };

    const deleteContactHandler = async () => {
        const success = await apiServices.deleteContact(selectedContact.id);
        if (success) {
            setContacts((prevContacts) =>
                prevContacts.filter((contact) => contact.id !== selectedContact.id)
            );
            toast.success('Delete successful', {
                position: toast.POSITION.TOP_RIGHT,
            });
            hideUpdateModalHandler();
        }
    };

    return (
        <>
            <ContactSearch contacts={contacts} onContactSelect={handleContactSelect} />
            {showUpdateContact && selectedContact && (
                <UpdateModal onClose={hideUpdateModalHandler}>
                    <UpdateContact
                        contact={selectedContact}
                        onUpdateContact={updateContactHandler}
                        onDeleteContact={deleteContactHandler}
                    />
                </UpdateModal>
            )}
            {isPosting && (
                <Modal onClose={onStopPosting}>
                    <NewContact onCancel={onStopPosting} onAddContact={addContactHandler} />
                </Modal>
            )}
            {!isFetching && contacts.length > 0 && (
                <ul className={classes.contacts}>
                    {contacts.map((contact, index) => (
                        <Contact
                            key={contact.id}
                            firstName={contact.firstName}
                            lastName={contact.lastName}
                            phoneNumber={contact.phoneNumber}
                            email={contact.email}
                            socialNetworkLink={contact.socialNetworkLink}
                            onUpdate={() => showUpdateModalHandler(contact)}
                            onClickDropdownItem={() => showUpdateModalHandler(contact)}
                            ref={index === contacts.length - 1 ? newContactRef : null} // Set the ref for the last contact
                        />
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
