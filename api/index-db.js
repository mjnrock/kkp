import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import mysql from "mysql";
import crypto from "crypto";

const DB = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "kkp",
});
const APP = express();
const PORT = 3001;

APP.use("/img", express.static(__dirname + "/data/image"));
APP.use(express.urlencoded({ extended: true }));
APP.use(express.json());
APP.use(express.raw());
APP.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //? Whatever middleware work .next() is doing is ESSENTIAL to actually making this work
    next();
});

APP.disable("x-powered-by");

const TOKEN_KEY = crypto.createHash("sha256").update(String(Date.now())).digest("base64").substr(0, 32);
const IV = crypto.randomBytes(16).toString("hex").slice(0, 16);

function createToken(email, password, expiration) {
    try {
        let text = JSON.stringify({
            email,
            password,
            timestamp: Date.now(),
            expiration
        });
        
        let cipher = crypto.createCipheriv("aes-256-ctr", TOKEN_KEY, IV);
        let encrypted = cipher.update(String(text), "utf8", "hex") + cipher.final("hex");

        return encrypted;
    } catch(e) {
        return false;
    }
}
function decryptToken(token) {
    try {
        let decipher = crypto.createDecipheriv("aes-256-ctr", TOKEN_KEY, IV);
        let decrypted = decipher.update(String(token), "hex", "utf8");
        
        decrypted += decipher.final("utf8");

        return JSON.parse(decrypted);
    } catch(e) {
        return false;
    }
}


APP.post("/login", (req, res) => {
    const message = req.body;
    const { email, password } = message;
    console.log("/login", message);

    if(!(email && password)) {
        return res.sendStatus(204);
    }

    DB.query(`CALL Login(?, ?, @UUID)`, [ email, password ], function (error, resultSets, fields) {
        const [ results ] = resultSets || [];
    
        if(results[ 0 ]) {
            const token = createToken(email, password, 60 * 60 * 24);    // 24 Hours

            return res.send({
                Token: token,
                ...(results[ 0 ] || {})
            });
        }
        
        return res.sendStatus(204);
    });
});

APP.get("/entity/:handle", (req, res) => {
    const handle = req.params.handle;
    console.log("/user", handle);

    if(!(handle)) {
        return res.sendStatus(204);
    }

    DB.query(`CALL GetEntity(?)`, [ handle ], function (error, resultSets, fields) {
        const [ results ] = resultSets || [];
    
        if(results[ 0 ]) {
            return res.send({
                ...(results[ 0 ] || {})
            });
        }
        
        return res.sendStatus(204);
    });
});

APP.get("/friends/:handle", (req, res) => {
    const handle = req.params.handle;
    console.log("/friends", handle);

    if(!(handle)) {
        return res.sendStatus(204);
    }

    DB.query(`CALL GetFriends(?)`, [ handle ], function (error, resultSets, fields) {
        const [ results ] = resultSets || [];
    
        if(results.length) {
            return res.send(results);
        }
        
        return res.sendStatus(204);
    });
});

APP.get("/family/:handle", (req, res) => {
    const handle = req.params.handle;
    console.log("/family", handle);

    if(!(handle)) {
        return res.sendStatus(204);
    }

    DB.query(`CALL GetFamily(?)`, [ handle ], function (error, resultSets, fields) {
        const [ results ] = resultSets || [];
    
        if(results.length) {
            return res.send(results);
        }
        
        return res.sendStatus(204);
    });
});


APP.listen(PORT, () =>
    console.log(`KiKi Pupus API listening on port ${PORT}!`),
);