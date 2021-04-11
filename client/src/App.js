import React, { useState } from 'react';
import './App.css';
import Axios from 'axios';

const App = () => { 

    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')

    return (
        <div className="App">
            <div className="registration">
                <h1>Registration</h1>
                <label>Username</label>
                <input 
                    type="text" 
                    onChange={(e)=>{
                        setUsernameReg(e.target.value);
                    }}
                />
                <label>Password</label>
                <input 
                    type="text" 
                    onChange={(e)=>{
                        setPasswordReg(e.target.value);
                    }}
                />
                <button> Register </button>
            </div>
            <div className="login">
                <h1>Login</h1>
                <input type="text" placeholder="Username..." />
                <input type="password" placeholder="Password..." />
                <button> Register </button>
            </div>
        </div>
    )
};


export default App;