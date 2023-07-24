import React, { useState, useEffect, useRef } from 'react';
import classes from './ContactSearch.module.css';

function ContactSearch({ contacts, onContactSelect }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const searchRef = useRef(null); // Create a ref for the search bar

    const handleInputChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        setShowDropdown(!!term.trim()); // Show the dropdown only if there is a non-empty search term
    };

    const handleContactSelect = (contact) => {
        setSearchTerm(''); // Clear the search term when a contact is selected
        setShowDropdown(false); // Hide the dropdown when a contact is selected
        onContactSelect(contact); // Call the onContactSelect function with the selected contact
    };

    const filteredContacts = contacts.filter((contact) =>
        `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Add an event listener to handle clicks outside the search bar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className={classes.search} ref={searchRef}>
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search by name..."
            />
            {showDropdown && (
                <ul className={classes.dropdown}>
                    {filteredContacts.map((contact) => (
                        <li key={contact.id} onClick={() => handleContactSelect(contact)}>
                            {contact.firstName} {contact.lastName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ContactSearch;
