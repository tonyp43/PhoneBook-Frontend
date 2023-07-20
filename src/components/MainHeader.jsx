import React from 'react';
import { FaUserCircle, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import styles from './MainHeader.module.css';

function MainHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <span className={styles.title}>Phonebook</span>
                <button className={styles.button}>
                    <FaPlus className={styles.buttonIcon} />
                    New Contact
                </button>
            </div>
            <div className={styles.right}>
                <span className={styles.greeting}>USERNAME</span>
                <button className={styles.buttonLogout}>
                    Logout
                </button>
            </div>
        </header>
    );
}

export default MainHeader;
