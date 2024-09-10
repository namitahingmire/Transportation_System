import React, { useState, useEffect } from 'react';
import './login.css';
import axios from 'axios';
import { USER_BASE_URL } from '../../constants/environment';
import { useNavigate } from 'react-router-dom';
import UserService from '../../services/user-service';

function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is already logged in from previous session
        const storedLoggedInStatus = localStorage.getItem('isLoggedIn');
        if (storedLoggedInStatus === 'true') {
            setIsLoggedIn(false);
            localStorage.setItem('isLoggedIn', isLoggedIn);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { email, password };

        axios.post(USER_BASE_URL + "login", data)
            .then(user => {
                console.log(user);
                if (user && user.data.message) {
                    alert(user.data.message);
                } else {
                    alert("Login Successfull");
                 
                    setIsLoggedIn(true);
                    localStorage.setItem('isLoggedIn', 'true');
                 
                    const userData = {
                        userId: user.data._id,
                        userType: user.data.userType
                    }

                    UserService.setUser(userData);
                    navigate('/home');
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='container-fluid' id="login-component">
            <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
                <div className='card w-50'>
                    <div className='card-header'>
                        <h1 className='text-center'>Login</h1>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className='card-body'>
                            <div className='mb-3'>
                                <label> <h4>Email:</h4> </label>
                                <input
                                    className='form-control'
                                    type="text"
                                    placeholder='Enter Email'
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className='mb-3'>
                                <label> <h4>Password:</h4> </label>
                                <input
                                    className='form-control'
                                    type="password"
                                    placeholder='Enter Password'
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>

                        <div className='card-footer'>
                            <div className='text-center'>
                                <button className='btn btn-success' type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
}

export default Login;