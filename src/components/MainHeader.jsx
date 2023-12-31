import React from 'react';
import { FaPlus } from 'react-icons/fa';
import styles from '../styles/MainHeader.module.css';
import { useNavigate } from 'react-router-dom';
import { getUsername, logout } from '../services/authServices';

function MainHeader({ onCreateContact, isCreating }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('login');
    };

    const createHandler = () => {
        onCreateContact();
        isCreating = true;
    }

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <span className={styles.title}>Phonebook</span>
                <button className={styles.button} onClick={createHandler}>
                    <FaPlus className={styles.buttonIcon} />
                    New Contact
                </button>
            </div>
            <div className={styles.right}>
                <span className={styles.greeting}>{getUsername()}</span>
                <button className={styles.buttonLogout} onClick={handleLogout} >
                    Logout
                </button>
            </div>
        </header>
    );
}

export default MainHeader;
