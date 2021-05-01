const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "jh485200@@",
    database: "LoginSystem",
});

app.post('/register', (req,res) => {

    const username = req.body.username;
    const password = req.body.password;

    db.query("INSERT INTO users (username,password) VALUES (?,?)",
    [username,password], 
    (err,result) => {
        if(err) {
            console.log(err, 'a_err');
        } else {
            res.send(result);
            console.log(result, 'a_success_a');
        }
    });
});

app.post('/login', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM users WHERE username = ? AND password = ?",
    [username,password], 
    (err,result) => {
        if(err) {
            res.send({err:err});
        } 
        if(result.length > 0) {
            res.send(result);
        } else {
            res.send({message: " wrong username/password combination! "})
        }       
    });
});

app.listen(3001, () => {
    console.log("running on 3001");
});