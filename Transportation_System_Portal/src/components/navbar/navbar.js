import React, { useState, useEffect } from 'react';
import './navbar.css';
import { Link, useLocation } from 'react-router-dom';
import UserService from '../../services/user-service';
import { USER_TYPE } from '../../constants/constant-data';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedIn);
    }, [location.pathname]); // Re-run effect when path changes

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home">Transportation System</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* Home */}
                        {isLoggedIn ?
                            (<li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`} aria-current="page" to="/home"> <i className="fa-solid fa-house"></i> Home</Link>
                            </li>) : ""}

                        {/* New Request */}
                        {isLoggedIn && UserService.getUser().userType === USER_TYPE.PROVIDER ?
                            (<li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/new-request' ? 'active' : ''}`} aria-current="page" to="/new-request"> <i className="fa-solid fa-house"></i> New Request</Link>
                            </li>) : ""}

                        {/* My Request */}
                        {isLoggedIn && UserService.getUser().userType === USER_TYPE.PROVIDER ?
                            (<li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/my-request' ? 'active' : ''}`} aria-current="page" to="/my-request"> My Request</Link>
                            </li>) : ""}

                        {/* In Transist Request */}
                        {isLoggedIn && UserService.getUser().userType === USER_TYPE.PROVIDER ?
                            (<li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/in-tansist-request' ? 'active' : ''}`} aria-current="page" to="/in-tansist-request"> In Transist Request</Link>
                            </li>) : ""}

                        {/* Accept Request */}
                        {isLoggedIn && UserService.getUser().userType === USER_TYPE.TRANSPORTER ?
                            (<li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/accept-request' ? 'active' : ''}`} aria-current="page" to="/accept-request"> Make New Bid</Link>
                            </li>) : ""}

                        {/* Pending Bids */}
                        {isLoggedIn && UserService.getUser().userType === USER_TYPE.TRANSPORTER ?
                            (<li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/pending-bids' ? 'active' : ''}`} aria-current="page" to="/in-tansist-request"> Pending Bids </Link>
                            </li>) : ""}
                            
                        {/* Completed Request */}
                        {isLoggedIn && (UserService.getUser().userType === USER_TYPE.PROVIDER || UserService.getUser().userType === USER_TYPE.TRANSPORTER) ?
                            (<li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/completed-request' ? 'active' : ''}`} aria-current="page" to="/completed-request"> Completed Request</Link>
                            </li>) : ""}



                    </ul>

                    <ul className='navbar-nav' id="right-section">
                        {isLoggedIn ? (
                            <li className='nav-item'><Link className='outline-none nav-link' to="/logout">Logout <i className="fa-solid fa-right-from-bracket"></i> </Link></li>) :
                            location.pathname === '/' ?
                                (<li className='nav-item'><Link className='outline-none nav-link' to="/register">Register</Link></li>) :
                                (<li className='nav-item'><Link className='outline-none nav-link' to="/">Login</Link></li>)
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
