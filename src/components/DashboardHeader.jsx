import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

const DashboardHeader = () => {
    const handleLogout = () => {
        // Implement your logout logic here
        // For example, clearing the token from localStorage and redirecting to the login page
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirect to the login page after logout
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" style={{ justifyContent: 'space-between' }}>
            <Navbar.Brand href="/">Dashboard</Navbar.Brand>
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </Navbar>
    );
};

export default DashboardHeader;