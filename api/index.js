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


APP.post("/auth", (req, res) => {
    const message = req.body;
    const { email, password: pwd } = message;
    console.log("/auth", message);

    if(email && pwd) {
        const hashPwd = crypto.createHash("sha256").update(pwd).digest("hex");
        const token = createToken(email, hashPwd, 60 * 60 * 24);    // 24 Hours
    
        if(token) {
            return res.send({
                token,
            });
        }
    }

    return res.send({
        token: false
    });
});

APP.post("/signup", (req, res) => {
    const message = req.body;
    const { email, password: pwd } = message;
    console.log("/signup", message);

    if(email && pwd) {
        const hashPwd = crypto.createHash("sha256").update(pwd).digest("hex");
        
        DB.query(`CALL SignUp(?, ?)`, [ email, hashPwd ], function (error, [ results ], fields) {
            if(results[ 0 ].Result) {
                const token = createToken(email, hashPwd, 60 * 60 * 24);    // 24 Hours
            
                if(token) {
                    return res.send({
                        token,
                    });
                }
            }
            
            return res.send({
                token: false
            });
        });
    }
});


APP.listen(PORT, () =>
    console.log(`KiKi Pupus API listening on port ${PORT}!`),
);