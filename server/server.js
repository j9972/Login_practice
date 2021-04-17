const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "pedro",
    host: "localhost",
    password: "password",
    database: "LogionSystem",
});

app.post('/register', (req,res) => {

    const username = req.body.username;
    const password = req.body.password;

    db.query("INSERT INTO users (username,password) VALUES (?,?)", [username,password], 
    (err,result) => {
        if(err) {
            console.log(err);
            console.log('a_err');
        } else {
            res.send(result);
            console.log('a_success_a');
        }
    });
})

app.listen(3001, () => {
    console.log("running on 3001");
});