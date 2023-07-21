import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainHeader from '../components/MainHeader';
import Modal from '../components/Modal';
import { getUsername, getToken, isTokenExpired } from '../services/authServices'; // Update the import
import ContactList from '../components/ContactList';

function Dashboard() {
    const [modalIsVisible, setModalIsVisible] = useState(false);

    function showModalHandler() {
        setModalIsVisible(true);
    }

    function hideModalHandler() {
        setModalIsVisible(false);
    }

    const navigate = useNavigate();

    useEffect(() => {
        // Check token expiry when the component mounts
        checkTokenExpiry();
    }, []);

    const checkTokenExpiry = () => {
        if (isTokenExpired()) {
            // Token has expired, redirect to login page or handle the expired token
            navigate('/login');
        } else {
            // Token is still valid, continue with the dashboard view
            console.log('Token is valid');
        }
    };

    return (
        <>
            <MainHeader onCreateContact={showModalHandler} />
            <main>
                <ContactList
                    isPosting={modalIsVisible}
                    onStopPosting={hideModalHandler}
                    onUpdateContact={showModalHandler}
                />
            </main>
        </>
    )
}

export default Dashboard;
