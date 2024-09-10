import React, { useEffect } from 'react';
import './logout.css';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    const navigate = useNavigate();
    
    useEffect(() => {
        if (!isLoggedIn || isLoggedIn === 'false') {
            navigate('/');
        } else {
            localStorage.setItem('isLoggedIn', false);
            navigate('/');
        }
    }, [isLoggedIn, navigate]);
}

export default Logout;