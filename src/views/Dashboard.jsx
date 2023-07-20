import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainHeader from '../components/MainHeader';
import { getUsername, getToken, isTokenExpired } from '../services/authServices'; // Update the import

function Dashboard() {
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
        <MainHeader />
    )
}

export default Dashboard;
