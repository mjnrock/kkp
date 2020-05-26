import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";

import Lib from "./lib/package";

const APP = express();
const PORT = 3001;

const DB = new Lib.DatabaseHelper({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "kkp",
});
const TOKENIZER = new Lib.TokenHelper({
    password: Date.now(),
});

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


APP.post("/login", (req, res) => {
    const message = req.body;
    const { email, password } = message;
    console.log("/login", message);

    if(!(email && password)) {
        return res.sendStatus(204);
    }

    DB.Call("Login", [ email, password, [ "@UUID" ]])
    .then(results => {
        const token = TOKENIZER.CreateToken({
            email,
            password,
            expiration: 60 * 60 * 24 * 1000,
        });    // 24 Hours

        return res.send({
            Token: token,
            ...(results.first || {})
        });
    })
    .catch(e => res.sendStatus(204));
});

//TODO WIP
// APP.post("/signup", (req, res) => {
//     const message = req.body;
//     const { email, password } = message;
//     console.log("/signup", message);

//     if(!(email && password)) {
//         return res.sendStatus(204);
//     }

//     DB.query(`CALL SignUp(?, ?, @NULL)`, [ email, password ], function (error, resultSets, fields) {
//         const [ results ] = resultSets || [[]];
    
//         if(results[ 0 ]) {
//             const token = createToken(email, password, 60 * 60 * 24 * 1000);    // 24 Hours

//             return res.send({
//                 Token: token,
//                 ...(results[ 0 ] || {})
//             });
//         }
        
//         return res.sendStatus(204);
//     });
// });

APP.get("/entity/:handle", (req, res) => {
    const handle = req.params.handle;
    console.log("/entity", handle);

    if(!(handle)) {
        return res.sendStatus(204);
    }

    DB.Call("GetEntity", [ handle ])
    .then(results => res.send(results.first))
    .catch(e => res.sendStatus(204));
});

APP.get("/friends/:handle", (req, res) => {
    const handle = req.params.handle;
    console.log("/friends", handle);

    if(!(handle)) {
        return res.sendStatus(204);
    }

    DB.Call("GetFriends", [ handle ])
    .then(results => res.send(results.all))
    .catch(e => res.sendStatus(204));
});

APP.get("/family/:handle", (req, res) => {
    const handle = req.params.handle;
    console.log("/family", handle);

    if(!(handle)) {
        return res.sendStatus(204);
    }

    DB.Call("GetFamily", [ handle ])
    .then(results => res.send(results.all))
    .catch(e => res.sendStatus(204));
});

APP.post("/post/reply", (req, res) => {
    const message = req.body;
    const token = TOKENIZER.DecryptToken(req.header("X-Auth"));
    const { post, entity, reply } = message;
    console.log("/post/react", post, entity, reply, token);

    if(!(token && post && entity && reply)) {
        return res.sendStatus(204);
    }

    DB.Call("CreateReplyPost", [ entity, post, reply ])
    .then(results => res.send(results.first))
    .catch(e => res.sendStatus(204));
});

APP.post("/post/react", (req, res) => {
    const message = req.body;
    const token = TOKENIZER.DecryptToken(req.header("X-Auth"));
    const { post, entity, reaction } = message;
    console.log("/post/react", post, entity, reaction, token);

    if(!(token && post && entity && reaction)) {
        return res.sendStatus(204);
    }

    DB.Call("CreatePostReaction", [ entity, post, reaction ])
    .then(results => res.send(results.first))
    .catch(e => res.sendStatus(204));
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
    DB.Call("GetPost", [ uuid ])
    .then(results => res.send(results.first))
    .catch(e => res.sendStatus(204));
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
    DB.Call("GetFeed", [ handle, [ "NULL" ] ])
    .then(results => res.send(results.all))
    .catch(e => res.sendStatus(204));
});


//* ================= <UPLOAD> =========================
    APP.post("/image/upload", (req, res) => {
        const token = TOKENIZER.DecryptToken(req.query.token);
        const entity = req.query.entity;
        let dbdata = {};
        console.log("/image/upload", entity, token);
        
        // if(token && (Date.now() < token.timestamp + token.expiration)) {
        if(token) {
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
                    DB.Call("CreateImagePost", [ entity, (path.extname(file.originalname) || "").replace(/[^0-9a-z]/gi, ""), [ "@NULL" ] ])
                    .then(results => {     
                        dbdata = (results.first || {});
                        
                        cb(null, dbdata.Filename);
                    })
                    .catch(e => res.sendStatus(204));
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