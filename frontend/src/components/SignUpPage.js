import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignUpPage.css';

const SignUpPage = () => {
    const [passVisible, setPassVisible] = useState(false);
    const [details, setDetails] = useState({name:"",username:"",email:"",password:""});

    const updateDetails = (e) => {
        setDetails(details => ({
            ...details,
            [e.target.name]: e.target.value
        }))
    }
    const updateUsername = (e) => {
        setDetails({ username: e.target.value });
    }
    const updateEmail = (e) => {
        setDetails({ email: e.target.value });
    }
    const updatePassword = (e) => {
        setDetails({ password: e.target.value });
    }
    return (
        <div>
            <div className="page-body">
                <div id="signup-box">
                    <div id="image-box">
                        {(details.name=="" && details.username=="" && details.email=="")?<h1 style={{"color":"white"}}>Register now</h1>:<div id="id-box">
                            <div id="id-header">ID</div>
                            <div id="id-body">
                                <div>
                                    <div style={{"display":`${(details.name==""?"none":"")}`}} id="id-name">{details.name}</div>
                                    <div style={{"display":`${(details.username==""?"none":"")}`}} id="id-username">@{details.username}</div>

                                    <div style={{"display":`${(details.email==""?"none":"")}`}} id="id-email-box"><i class="fa-solid fa-envelope"></i><div id="id-email">{details.email}</div></div>
                                </div>
                            </div>
                        </div>}
                    </div>
                    <div id="form-box">
                        <div className="text-large" id="login-heading">Welcome</div>
                        <div className="text-small" id="login-text">Enter the following details</div>
                        <div className="form-field-box" id="name-box">
                            <i className="fa-solid fa-user"></i>
                            <input type="text" onChange={updateDetails} className="login-fields" name="name" id="name" placeholder='Enter your name' />
                        </div>

                        <div className="form-field-box" id="username-box">
                            <i className="fa-solid fa-at"></i>
                            <input type="text" onChange={updateDetails} className="login-fields" name="username" id="username" placeholder='Username' />
                        </div>
                        <div className="form-field-box" id="email-box">
                            <i class="fa-solid fa-envelope"></i>
                            <input type="email" onChange={updateDetails} className="login-fields" name="email" id="email" placeholder='Enter your email' />
                        </div>
                        <div className="form-field-box" id="password-box">
                            <i className="fa-solid fa-key"></i>
                            <input type={(passVisible) ? "text" : "password"} onChange={updateDetails} className="login-fields password-field" name="password" id="password" placeholder='Password' />
                            <i id="eye-btn-signup" onClick={() => { setPassVisible(!passVisible) }} className={(!passVisible) ? "fa-solid fa-eye" : "fa-sharp fa-solid fa-eye-slash"} />
                        </div>
                        <div className="form-field-box" id="password-box">
                            <i className="fa-solid fa-key"></i>
                            <input type="password" className="login-fields" name="password-confirm" id="password-confirm" placeholder='Confirm your Password' />
                        </div>
                        <div id="register-btn-div">
                            <button className="button-submit">Register</button>
                        </div>
                        <div id="sub-text">
                            Already a user? <Link id="login-link" to="/login">Log in</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage