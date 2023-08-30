import React, {  useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import appContext from '../context/appContext';


export default function SignUp() {


    const context = useContext(appContext);
    const { signUpUser } = context;

    
    const usenavigate = useNavigate();

    const [Inputprofile, setInputprofile] = useState()
    const [newCrede, setnewCrede] = useState({ name: "", email: "", password: "" })

    const handleFileChange = (e) => {
        setInputprofile(e.target.files[0])
        console.log(e.target.files[0])
    };
    const handleChange = (e) => {
        setnewCrede({ ...newCrede, [e.target.name]: e.target.value })

    }

    const handleSignUp = (e) => {
        e.preventDefault();
        signUpUser(newCrede.name, newCrede.email, newCrede.password, Inputprofile);
        usenavigate('/login')
    }

    return (
        <div  className='d-flex align-c justify-content-center'  >


            <div className=" border border-secondary p-3 mt-5 rounded" style={{width: "500px"}} >
                <h1 className=" text-center fs-3 my-3 " >Register Here </h1>
                <form onSubmit={handleSignUp}  >
                    <div className="mb-3">
                        <label htmlFor="inputFile" className="form-label">Profil Picture</label>
                        <input type="file" className="form-control" id="inputFile" onChange={handleFileChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="signUpName" className="form-label">Full Name</label>
                        <input type="text" className="form-control" id="signUpName" name='name' value={newCrede.name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="signUpEmail" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="signUpEmail" name='email' value={newCrede.email} onChange={handleChange} aria-describedby="emailHelp" required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="signUpPass" className="form-label">Password</label>
                        <input type="password" className="form-control" id="signUpPass" name='password' value={newCrede.password} onChange={handleChange}  required/>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Terms & Conditions</label>
                    </div>
                    <div className='d-flex align-c justify-content-center'>
                        <input type="submit" className="btn btn-primary" style={{ width: "100%" }} value="SignUp" />
                    </div>
                </form>
                <div className='my-3'>
                    {/* <p>Already have an acount? <span className='text-primary' style={{ cursor: "pointer" }} onClick={openLoginModal} >Click here to LogIn</span> </p> */}
                    <p>Already have an acount? <Link to="/login" className='text-primary' style={{ cursor: "pointer" }}  >Click here to LogIn</Link> </p>
                </div>
            </div>

        </div>
    )
}
