
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';




export default function Navbar() {

    const location = useLocation()

    const usenavigate = useNavigate();

    const LogOutUser = ()=>{
        localStorage.removeItem('vToken');
        usenavigate('/login')
        
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">KORERO</Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`} to="/profile">Profile</Link>
                            </li>
                        </ul>

                        <div className='d-flex gap-2 justifi-content-center' >
                            {!localStorage.getItem("vToken") ? <>
                            <Link to="/login" type="button"  className="btn btn-success " >LogIn</Link>
                            <Link to="/signup" type="button"  className="btn btn-danger" >SignUp</Link>
                            </> : <button className='btn btn-danger' onClick={LogOutUser} >LogOut</button> }
                        </div>

                    </div>
                </div>
            </nav>
        </div>
    )
}
