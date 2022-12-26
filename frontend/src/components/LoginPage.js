import React,{useState} from 'react';

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const updateUsername = (e)=>{
        setUsername(e.target.value);
    }

    const updatePassword = (e)=>{
        setPassword(e.target.value);
    }

    const handleClick = (event)=>{
        //Make the api call
        //POST /auth?username=username&password=password 
        event.preventDefault();
        console.log("Clicked");
    }
    return (
        <div>
            <div className="page-body">
                <div className="login-box">
                    <div className="text-large" id="login-heading">Hello Again!</div>
                    <div className="text-small" id="login-text">Enter your username and password</div>
                    <div className="form-field-box" id="username-box">
                        <i className="fa-solid fa-at"></i>
                        <input type="text" onChange={updateUsername} name="username" id="username" placeholder='Username' />
                    </div>
                    <div className="form-field-box" id="password-box">
                        <i className="fa-solid fa-key"></i>
                        <input type="password" onChange={updatePassword} name="password" id="password" placeholder='Password' />
                    </div>
                    <div className="sub-controls">
                        <div id="checkbox-div">
                            <input type="checkbox" name="remember-me" id="remember-me" />Remember me
                        </div>
                        <a href='/' className='small-link'>Forgot password</a>
                    </div>
                    <div id="submit-btn-div">
                        <button className="button-submit" onClick={handleClick}>Submit</button>
                    </div>
                    <div id="register">
                        <div style={{"marginRight":"5px"}}>New Here?</div>
                        <div className="small-link">Register</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage