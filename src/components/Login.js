import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import appContext from '../context/appContext';



export default function Login() {

    const context = useContext(appContext);
    const { logInUser } = context;
    
    const [inputTyp, setinputTyp] = useState("password");
    const [showCheck, setshowCheck] = useState(false);

    const [cred, setCred] = useState({email: "", password: ""})

    useEffect(() => {
        if (showCheck) {
            setinputTyp('text')
        } else (
            setinputTyp("password")
        )
    }, [showCheck])

    const handleShowPass = () => {
        if (showCheck) {
            setshowCheck(false)
        } else (
            setshowCheck(true)
        )
    };

    
    const handleChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }

    const handleLogin = (e)=>{
        e.preventDefault();
        logInUser(cred.email, cred.password)

    }

    return (

        <div className='d-flex align-c justify-content-center'  >


            <div className=" border border-secondary p-3   rounded" style={{ width: "400px" , marginTop: "70px"}} >
                <h1 className=" text-center fs-3 my-3 " >Register Here </h1>
                <form onSubmit={handleLogin} >
                    <div className="mb-3">
                        <label htmlFor="loginEmail" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="loginEmail" name='email' value={cred.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="loginPass" className="form-label">Password</label>
                        <input type={inputTyp} className="form-control" id="loginPass" name='password' value={cred.password} onChange={handleChange} required />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" onClick={handleShowPass} id="showPassCheck" />
                        <label className="form-check-label" htmlFor="showPassCheck">Show Password</label>
                    </div>
                    <div className="mb-3">
                        <p className='text-primary' style={{ cursor: "pointer" }} >Forget Password?</p>
                    </div>
                    <div className='d-flex align-c justify-content-center'>
                        <input type="submit" className="btn btn-primary" style={{ width: "100%" }} value="LogIn" />
                    </div>
                </form>
                <div className='my-3'>
                    <p>Dont have an acount? <Link  to="/signup" className='text-primary' style={{ cursor: "pointer" }}  >Click here to SignUp</Link> </p>
                </div>
            </div>

        </div>
    )
}
