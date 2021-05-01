import React, { useState } from 'react';
import './App.css';
import Axios from 'axios';

const App = () => { 

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');

    const [loginStatus, setLoginStatus] = useState('');

    const register = () => {
        Axios.post('http://localhost:3001/register', { 
            username: usernameReg,  
            password: passwordReg,
        }).then((res) => {
            console.log(res);
            console.log("success");
        });
    };

    const login = () => {
        Axios.post('http://localhost:3001/login', { 
            username: username,  
            password: password,
        }).then((res) => {
            if(res.data.message) {
                setLoginStatus(res.data.message)
            } else {
                setLoginStatus(res.data[0].username + '님 환영합니다');
            }
            console.log(res.data);
        });
    };

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
                <button onClick={register}> Register </button>
            </div>

            <div className="login">
                <h1>Login</h1>
                <input type="text" placeholder="Username..." onChange={(e)=>{
                        setUsername(e.target.value);
                    }}/>
                <input type="password" placeholder="Password..." onChange={(e)=>{
                        setPassword(e.target.value);
                    }}/>
                <button onClick={login}> Login </button>
            </div>

            <h1>{loginStatus}</h1>
        </div>
    )
};


export default App;