import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';

const App = () => { 

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');

    const [loginStatus, setLoginStatus] = useState(false);

    Axios.defaults.withCredentials = true;

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
            if(!res.data.auth) {
                setLoginStatus(false);
            } else {
                localStorage.setItem("token", res.data.token);
                setLoginStatus(true);
            }
        });
    };

    const userAuthenticated = () => {
        Axios.get("http://localhost:3001/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        }).then((res) => {
            console.log(res);
        })
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((res) => {
            if(res.data.loggedIn === true){
                setLoginStatus(res.data.user[0].username);
            }
            //console.log(res.data.user[0].username);
        })
    }, []);

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

            {loginStatus && <button onClick={userAuthenticated}>Check if Authenticated</button>}
        </div>
    )
};


export default App;