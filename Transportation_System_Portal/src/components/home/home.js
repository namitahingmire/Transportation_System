import React, { useEffect } from 'react';
import './home.css';
import Navbar from '../navbar/navbar';
import { useNavigate } from 'react-router-dom';
import homeImage from '../../assets/home-img.png';
function Home() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn || isLoggedIn === 'false') {
            navigate('/');
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className='container-fluid' id="home-component">
            {/* <Navbar /> */}
            <div className='home-img  d-flex align-items-center justify-content-center'>
                <img src={homeImage} ></img>
            </div>

            <div className='row' id="marketing">
                <div className='col-md-4'>
                    <div className='card d-flex  align-items-center justify-content-center '>
                        <h3>Lower Price</h3>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card d-flex align-items-center justify-content-center'>
                        <h3>Fast Service</h3>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card d-flex  align-items-center justify-content-center'>
                        <h3>No Cancellation Fees</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
