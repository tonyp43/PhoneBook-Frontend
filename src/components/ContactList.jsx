import { useState, useEffect } from 'react';
import Contact from './Contact';
import NewContact from './NewContact';
import Modal from './Modal';
import classes from '../styles/ContactList.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateModal from './UpdateModal';
import UpdateContact from './UpdateContact';
import * as apiServices from '../services/apiServices';

function ContactList({ isPosting, onStopPosting, isCreating }) {
    const [contacts, setContacts] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [showUpdateContact, setShowUpdateContact] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    function showUpdateModalHandler(contact) {
        setSelectedContact(contact);
        setShowUpdateContact(true); // Open the UpdateContact component
    }

    function hideUpdateModalHandler() {
        setSelectedContact(null);
        setShowUpdateContact(false); // Close the UpdateContact component
    }

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

    //call api services to add a new contact
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
            }
        } catch (error) {
            console.error(error);
            toast.error('Error: ' + error, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    //call api services to update a contact
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

    //call api services to delete a contact
    const deleteContactHandler = async () => {
        const success = await apiServices.deleteContact(selectedContact.id);
        if (success) {
            setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== selectedContact.id));
            toast.success('Delete successful', {
                position: toast.POSITION.TOP_RIGHT,
            });
            hideUpdateModalHandler();
        }
    };

    // Filter contacts based on the search term
    const filteredContacts = contacts.filter(
        (contact) =>
            `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Render all contacts when the search term is empty
    const displayedContacts = searchTerm.trim() === '' ? contacts : filteredContacts;

    return (
        <>
            {/* Render a search input to filter contacts */}
            <div className={classes.search}>
                <input className={classes.search}
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search by name..."
                />
            </div>
            {showUpdateContact && selectedContact && (
                <UpdateModal onClose={hideUpdateModalHandler}>
                    <UpdateContact
                        contact={selectedContact}
                        onUpdateContact={updateContactHandler}
                        onDeleteContact={deleteContactHandler}
                        onClose={hideUpdateModalHandler}
                    />
                </UpdateModal>
            )}
            {isPosting && (
                <Modal onClose={onStopPosting}>
                    <NewContact onCancel={onStopPosting} onAddContact={addContactHandler} />
                </Modal>
            )}
            {!isFetching && displayedContacts.length > 0 && (
                <ul className={classes.contacts}>
                    {displayedContacts.map((contact) => (
                        <Contact
                            key={contact.id}
                            firstName={contact.firstName}
                            lastName={contact.lastName}
                            phoneNumber={contact.phoneNumber}
                            email={contact.email}
                            socialNetworkLink={contact.socialNetworkLink}
                            onUpdate={() => showUpdateModalHandler(contact)}
                            onClickDropdownItem={() => showUpdateModalHandler(contact)}
                        />
                    ))}
                </ul>
            )}
            {!isFetching && filteredContacts.length === 0 && (
                <div style={{ textAlign: 'center', color: 'white', backgroundColor: '#7f50e4' }}>
                    <h2>No matching contacts found.</h2>
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
