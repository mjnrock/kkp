import mysql from "mysql";
import crypto from "crypto";

const DB = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "kkp",
});

const email = "email@aol.com";
const password = "P@$sw0rd";
let out;

DB.query(`CALL Login(?, ?, @UUID)`, [ email, password, out ], function (error, res, fields) {
    const [ results ] = res || [];

    if(results[ 0 ] && results[ 0 ].UUID) {
        const uuid = results[ 0 ].UUID;

        
    }
});