import React, { useState } from 'react';
import './register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { USER_BASE_URL } from '../../constants/environment';

function Register() {

    const [fullName, setFullName] = useState();
    const [contact, setContact] = useState();
    const [address, setAddress] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [userType, setUserType] = useState("Provider");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            const data = { fullName, contact, address, userType, email, password }
            axios
                .post(USER_BASE_URL, data)
                .then(res => {
                    console.log(res);
                    navigate('/');
                })
                .catch(err => console.log(err));
        }
        else {
            alert("Password does not match with Confirm Password");
        }
    }

    return (
        <div className='container-fluid' id="register-component">
            <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
                <div className='card w-50'>
                    <div className='card-header'>
                        <h1 className='text-center'>Register</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='mb-3'>
                                        <label><h5>Full Name:</h5></label>
                                        <input
                                            className='form-control'
                                            type="text"
                                            placeholder='Enter Full Name'
                                            onChange={(e) => setFullName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div className='mb-3'>
                                        <label><h5>Contact</h5></label>
                                        <input
                                            className='form-control'
                                            type="text"
                                            placeholder='Enter Contact'
                                            onChange={(e) => setContact(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='mb-3'>
                                <label><h5>Address:</h5></label>
                                <input
                                    className='form-control'
                                    type="text"
                                    placeholder='Enter Address'
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>

                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='mb-3'>
                                        <label><h5>Email:</h5></label>
                                        <input
                                            className='form-control'
                                            type="email"
                                            placeholder='Enter Email'
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='mb-3'>
                                        <label><h5>User Type:</h5> </label>
                                        <select class="form-select" aria-label="Default select example"
                                            onChange={(e) => setUserType(e.target.value)} >
                                            <option value="Provider" selected>Provider</option>
                                            <option value="Transporter">Transporter</option>
                                            {/* <option value="3">Three</option> */}
                                        </select>
                                    </div>
                                </div>
                            </div>


                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='mb-3'>
                                        <label><h5>Password:</h5></label>
                                        <input
                                            className='form-control'
                                            type="password"
                                            placeholder='Enter Password'
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div className='mb-3'>
                                        <label><h5>Confirm Password:</h5></label>
                                        <input
                                            className='form-control'
                                            type="password"
                                            placeholder='Enter Confirm Password'
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                            </div>


                        </div>

                        <div className='card-footer'>
                            <div className='text-center'>
                                <button className='btn btn-success'>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;