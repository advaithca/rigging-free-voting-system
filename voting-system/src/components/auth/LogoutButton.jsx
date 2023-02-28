import React from 'react';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const { user, logout } = UserAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
            console.log('You are logged out')
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <button onClick={handleLogout} className='border text-white px-6 py-2 my-4'>
            Logout
        </button>
    );
};

export default LogoutButton;
