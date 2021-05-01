const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require('express-session');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}));

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    key: "userId",
    secret: "thisIsReallyImportantSoYouMustMakeItHardForNoOneKnowIt",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires:60 * 60 * 24,
    },
}))

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "jh485200@@",  
    database: "LoginSystem",
});

app.post('/register', (req,res) => {

    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if(err) {
            console.log(err);
        }
        db.query(
            "INSERT INTO users (username,password) VALUES (?,?)",
            [username,hash], 
            (err,result) => {
                if(err) {
                    console.log(err, 'a_err');
                } else {
                    res.send(result);
                    console.log(result, 'a_success_a');
                }
        });
    });
});

const verifyJWT = (req,res,next) => {
    const token = req.headers["x-access-token"]

    if(!token) {
        res.send("yo we need a token, plz give it to us next time");
    } else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if(err) {
                res.json({auth:false, message: "u failed to authenticate"});
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
}

app.get('/isUserAuth', verifyJWT ,(req,res) => {
    res.send("yo, u r authenticated Congrats");
})

app.get('/login' , (req,res) => {
    if(req.session.user) {
        res.send({loggedIn: true, user: req.session.user});
    } else {
        res.send({loggedIn: false});
    }
})

app.post('/login', (req,res) => {
    const username = req.body.username;
    const password = req.body.password; 

    db.query("SELECT * FROM users WHERE username = ?",
    username, 
    (err,result) => {
        if(err) {
            res.send({err:err});
        } 
        if(result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
                if(response) {
                    const id = result[0].id;
                    const token = jwt.sign({id}, "jwtSecret", {
                        expiresIn: 300,
                    })
                    req.session.user = result;

                    res.json({auth:true, token:token, result: result});
                } else {
                    res.json({auth:false, message: "wrong username/password combination"});
                }
            })
        } else {
            res.json({auth:false, message: "no user exists"});
        }       
    });
});

app.listen(3001, () => {
    console.log("running on 3001");
});