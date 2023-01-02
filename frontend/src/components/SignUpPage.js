import React, { useState,useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import { Link, useNavigate } from 'react-router-dom';
import './SignUpPage.css';

const SignUpPage = () => {
    const context = useContext(noteContext);
    const redirect = useNavigate();
    const {theme,signupUser} = context;
    const [passVisible, setPassVisible] = useState(false);
    const [details, setDetails] = useState({name:"",username:"",email:"",password:""});
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const handlePasswordConfirm  = (e)=>{
        setPasswordConfirm(e.target.value)
    }

    const updateDetails = (e) => {
        setDetails(details => ({
            ...details,
            [e.target.name]: e.target.value
        }))
    }

    const handleRegister = async (e)=>{
        if(await signupUser(details.name, details.username,details.email,details.password)===true){
            redirect("/login");
        }else{
            alert("User already exists")
        }
    }
    return (
        <div>
            <div className="page-body">
                <div id="signup-box">
                    <div id="image-box">
                        {(details.name==="" && details.username==="" && details.email==="")?<h1 style={{"color":"white"}}>Register now</h1>:<div id="id-box">
                            <div id="id-header">ID</div>
                            <div id="id-body">
                                <div>
                                    <div style={{"display":`${(details.name===""?"none":"")}`}} id="id-name">{details.name}</div>
                                    <div style={{"display":`${(details.username===""?"none":"")}`}} id="id-username">@{details.username}</div>
                                    <div style={{"display":`${(details.email===""?"none":"")}`}} id="id-email-box"><i className="fa-solid fa-envelope"></i><div id="id-email">{details.email}</div></div>
                                </div>
                            </div>
                        </div>}
                    </div>
                    <div id="form-box" className={`${(theme==="light")?"light-box":"dark-box"}`}>
                        <div className="text-large" id="login-heading">Welcome</div>
                        <div className="text-small" id="login-text">Enter the following details</div>
                        <div className="form-field-box" id="name-box">
                            <i className="fa-solid fa-user"></i>
                            <input type="text" onChange={updateDetails} className={`login-fields ${(theme==="light")?"":"field-dark"}`} name="name" id="name" placeholder='Enter your name' />
                        </div>

                        <div className="form-field-box" id="username-box">
                            <i className="fa-solid fa-at"></i>
                            <input type="text" onChange={updateDetails} className={`login-fields ${(theme==="light")?"":"field-dark"}`} name="username" id="username" placeholder='Username' />
                        </div>
                        <div className="form-field-box" id="email-box">
                            <i class="fa-solid fa-envelope"></i>
                            <input type="email" onChange={updateDetails} className={`login-fields ${(theme==="light")?"":"field-dark"}`} name="email" id="email" placeholder='Enter your email' />
                        </div>
                        <div className="form-field-box" id="password-box">
                            <i className="fa-solid fa-key"></i>
                            <input type={(passVisible) ? "text" : "password"} onChange={updateDetails} className={`login-fields ${(theme==="light")?"":"field-dark"} password-field`} name="password" id="password" placeholder='Password' />
                            <i onClick={() => { setPassVisible(!passVisible) }} className={(!passVisible) ? `eye-btn-signup ${(theme==="light")?"":"eye-dark-signup"} fa-solid fa-eye` : `eye-btn-signup ${(theme==="light")?"":"eye-dark-signup"} fa-sharp fa-solid fa-eye-slash`} />
                        </div>
                        <div className="form-field-box" id="password-box-div">
                            <div id="password-box">
                            <i className="fa-solid fa-key"></i>
                            <input type="password" onChange={handlePasswordConfirm} className={`login-fields ${(theme==="light")?"":"field-dark"}`} name="password-confirm" id="password-confirm" placeholder='Confirm your Password' />
                            </div>
                            {(passwordConfirm!==details.password && passwordConfirm!=="")?<div style={{"fontSize":"15px","color":"red"}}>Passwords do not match</div>:""}
                        </div>
                        <div id="register-btn-div">
                            <button className="button-submit" onClick={handleRegister}>Register</button>
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