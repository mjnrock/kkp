import DatabaseHelper from "./lib/DatabaseHelper";

const DB = new DatabaseHelper({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "kkp",
});

const email = "email@aol.com";
const password = "P@$sw0rd";

DB.Call("Login", [ email, password, [ "@UUID" ] ])
.then(console.log)
.catch(console.log);