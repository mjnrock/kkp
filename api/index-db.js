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
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Auth");
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

    DB.query(`CALL Login(?, ?, @NULL)`, [ email, password ], function (error, resultSets, fields) {
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

APP.post("/post/react", (req, res) => {
    const message = req.body;
    const token = decryptToken(req.header("X-Auth"));
    const { post, entity, reaction } = message;
    console.log("/post/react", post, entity, reaction, token);

    if(!(token && post && entity && reaction)) {
        return res.sendStatus(204);
    }

    DB.query(`CALL CreatePostReaction(?, ?, ?)`, [ entity, post, reaction ], function (error, resultSets, fields) {
        const [ results ] = resultSets || [];
    
        if((results || []).length) {
            return res.send(results[ 0 ]);
        }
        
        return res.sendStatus(204);
    });
});

APP.get("/post/:uuid", (req, res) => {
    const uuid = req.params.uuid;
    console.log("/post", uuid);

    if(!(uuid)) {
        return res.sendStatus(204);
    }

    /**
     * 0: $UUID (UUID)
     */
    DB.query(`CALL GetPost(?)`, [ uuid ], function (error, resultSets, fields) {
        const [ results ] = resultSets || [];
    
        if((results || []).length) {
            return res.send(results[ 0 ]);
        }
        
        return res.sendStatus(204);
    });
});

APP.get("/feed/:handle", (req, res) => {
    const handle = req.params.handle;
    console.log("/feed", handle);

    if(!(handle)) {
        return res.sendStatus(204);
    }

    /**
     * 0: $Entity (Handle|UUID)
     * 1: $BeginDateTime (DATETIME(3)|NULL)
     */
    DB.query(`CALL GetFeed(?, NULL)`, [ handle ], function (error, resultSets, fields) {
        const [ results ] = resultSets || [];
    
        if((results || []).length) {
            return res.send(results);
        }
        
        return res.sendStatus(204);
    });
});


//* ================= <UPLOAD> =========================
    APP.post("/image/upload", (req, res) => {
        const token = decryptToken(req.query.token);
        const entity = req.query.entity;
        let dbdata = {};
        console.log("/image/upload", token);

        if(token && token.email) {
            const MULTER_STORAGE = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, "./data/image");
                },
        
                filename: function (req, file, cb) {
                    /**
                     * 0: $Account (Email|Username|UUID)
                     * 1: $Entity (Handle|UUID)
                     * 2: $Extension (Key<AssetExtension>)
                     * 3: OUT $UUID
                     */
                    DB.query(`CALL CreateImagePost(?, ?, ?, @NULL)`, [ token.email, entity, (path.extname(file.originalname) || "").replace(/[^0-9a-z]/gi, "") ], function (error, resultSets, fields) {
                        const [ results ] = resultSets || [];
                    
                        if((results || []).length) {
                            dbdata = results[ 0 ];

                            cb(null, dbdata.Filename);
                        }
                    });
                }
            });

            let upload = multer({
                storage: MULTER_STORAGE,
                fileFilter: (req, file, cb) => {
                    // Accept images only
                    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
                        req.fileValidationError = "Only image files are allowed!";
    
                        return cb(new Error("Only image files are allowed!"), false);
                    }
                    cb(null, true);
                }
            }).single("photo");
    
            upload(req, res, function (err) {
                console.log(res);
                // req.file contains information of uploaded file
                // req.body contains information of text fields, if there were any
    
                if (req.fileValidationError) {
                    return res.send(req.fileValidationError);
                } else if (!req.file) {
                    return res.send("Please select an image to upload");
                } else if (err instanceof multer.MulterError) {
                    return res.send(err);
                } else if (err) {
                    return res.send(err);
                }

                return res.send(dbdata);
            });
        }
    });
//* ================= </UPLOAD> =========================


APP.listen(PORT, () =>
    console.log(`KiKi Pupus API listening on port ${PORT}!`),
);