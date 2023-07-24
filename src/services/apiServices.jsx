import axios from 'axios';
import { hostUrl } from '../config/apiConfig';
import { getToken, isTokenExpired } from './authServices';

export async function fetchContacts() {
    try {
        if (!getToken() || isTokenExpired()) {
            //TODO: Implement something for when the token expires while the user is still using the app
            return [];
        }

        const response = await axios.get(hostUrl + '/api/Contact/GetContacts', {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to fetch contacts');
        }
    } catch (error) {
        console.error(error);
        // You can return an empty array or handle the error state appropriately.
        return [];
    }
}

export async function addContact(contactData) {
    try {
        const response = await axios.post(
            hostUrl + '/api/Contact/CreateContact',
            contactData,
            {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.status === 200) {
            return true;
        } else {
            console.log('Request failed:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

export async function updateContact(contactData, contactId) {
    try {
        const response = await axios.post(
            hostUrl + '/api/Contact/Update?id=' + contactId,
            contactData,
            {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.status === 200) {
            return true;
        } else {
            console.log('Request failed:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

export async function deleteContact(contactId) {
    try {
        const response = await axios.delete(
            hostUrl + '/api/Contact/DeleteContact?id=' + contactId,
            {
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.status === 200) {
            return true;
        } else {
            console.log('Request failed:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}