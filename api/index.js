import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";

const APP = express();
const PORT = 3001;
const SERVERS = {
    ALBUM: {
        protocol: "http",
        host: "localhost",
        port: PORT,
        endpoint: "/",
        uri: function(extra) {
            let scope = SERVERS.ALBUM;
            let endpoint = `/${ scope.endpoint }/${ extra }`.replace(/[/]{2,}/g, "/");

            return `${ scope.protocol }://${ scope.host }:${ scope.port }${ endpoint }`;
        }
    }
};

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

//* ================= <AUTHENTICATION> =========================
APP.post("/auth", (req, res) => {
    const message = req.body;
    const { email, password } = message;

    console.log("/auth", message);

    //TODO Make a real auth token
    return res.send({
        token: Date.now()
    });
});
APP.post("/signup", (req, res) => {
    const message = req.body;
    const { email, password } = message;

    console.log("/signup", message);

    //TODO Make a real signup
    return res.send({
        token: Date.now()
    });
});
//* ================= </AUTHENTICATION> =========================


//* ================= <UPLOAD> =========================
    // //? An example <FORM> 
    // <form action={ `http://localhost:3001/media/upload` } method="post" encType="multipart/form-data">
    //     <input type="file" name="avatar" />                
    //     <input type="submit" name="upload-button" value="Upload" />
    // </form>

    const MULTER_STORAGE = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./data/image");
        },

        // By default, multer removes file extensions so let"s add them back
        filename: function (req, file, cb) {
            cb(null, `${ file.fieldname }-${ Date.now() }${ path.extname(file.originalname) }`);
        }
    });

    APP.post("/media/upload", (req, res) => {
        console.log("/media/upload");

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
        }).single("photo");    // ("avatar") is the <input name="avatar" type="file" /> element

        upload(req, res, function (err) {
            // req.file contains information of uploaded file
            // req.body contains information of text fields, if there were any

            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            }
            else if (!req.file) {
                return res.send("Please select an image to upload");
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }

            const postFilename = `./data/post/${ req.body.handle.toLowerCase() }.json`;
            fs.readFile(postFilename, "utf8", (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    let posts = JSON.parse(data);
                    
                    posts.push({
                        id: `${ req.body.handle }-${ Date.now() }`,
                        image: req.file.filename,
                    });
    
                    let json = JSON.stringify(posts);
                    fs.writeFile(postFilename, json, () => true);
                }
            });

            return res.send({
                imageId: req.file.filename,
            });
        });
    });
//* ================= </UPLOAD> =========================


//* ================= <POSTS> =========================
    APP.post("/post/react/", (req, res) => {
        const filepath = "./data/messages.json";
        const message = req.body;
        const { pid, emoji, token: user } = message;

        console.log("/post/react/", message);

        fs.readFile(filepath, "utf8", (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let posts = JSON.parse(data);
                let resPost;
                posts.map(post => {
                    if (post.id === pid) {
                        post.reactions = post.reactions || [];
                        post.reactions.push({
                            emoji,
                            user
                        });

                        resPost = {
                            id: post.id,
                            reactions: post.reactions
                        };
                    }
                });

                let json = JSON.stringify(posts);
                fs.writeFile(filepath, json, () => {
                    res.send(resPost);
                });
            }
        });
    });
    APP.post("/post/response/", (req, res) => {
        const filepath = "./data/messages.json";
        const message = req.body;

        console.log("/post/response/", message);

        //TODO Save comments to a post
    });
//* ================= </POSTS> =========================

APP.get("/album/:aid", (req, res) => {
    const albumId = req.params.aid;
    console.log(`/album/${ albumId }`);

    fs.readdir(path.join(__dirname, "/data/image/"), function (err, files) {
        if(err) {
            return;
        } 

        const uris = files.map(file => SERVERS.ALBUM.uri(`/img/${ file }`));

        res.send(uris);
    });
});

APP.get("/user/:handle", (req, res) => {
    const handle = req.params.handle.toLowerCase();
    const filename = `./data/user/${ handle }.json`;
    console.log(`/user/${handle}`);

    fs.readFile(filename, function (err, buff) {
        return res.send(buff.toString());
    });
});

APP.get("/family/:handle", (req, res) => {
    const handle = req.params.handle.toLowerCase();
    const filename = `./data/family/${ handle }.json`;
    console.log(`/family/${handle}`);

    fs.readFile(filename, function (err, buff) {
        return res.send(buff.toString());
    });
});

APP.get("/friends/:handle", (req, res) => {
    const handle = req.params.handle;
    const filename = `./data/user/${ handle.toLowerCase() }.json`;
    console.log(`/friends/${handle}`);

    fs.readFile(filename, "utf8", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let profile = JSON.parse(data);
            
            return res.send(profile.friends);
        }
    });
});

APP.get("/post/:pid", (req, res) => {
    const postId = req.params.pid;
    const filename = `./data/post/${ postId.split("-")[ 0 ].toLowerCase() }.json`;
    console.log(`/post/${postId}`);

    fs.readFile(filename, "utf8", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let posts = JSON.parse(data);
            let post = posts.filter(post => post.id === postId);
    
            if(post) {
                return res.send(post[ 0 ]);
            }

            return res.sendStatus(404);
        }
    });
});

APP.get("/feed/:handle", (req, res) => {
    const handle = req.params.handle;
    console.log(`/feed/${handle}`);

    fs.readFile(`./data/post/${ handle.toLowerCase() }.json`, function (err, buff) {
        return res.send(buff.toString());
    });
});

APP.get("/image/:iid", (req, res) => {
    const imageId = "pusheen" || req.params.iid;
    const imageExt = "png";
    const filepath = `/data/image/${imageId}.${imageExt}`;
    console.log(`/image/${imageId}`);

    return res.sendFile(filepath, { root: __dirname });
});

APP.listen(PORT, () =>
    console.log(`KiKi Pupus API listening on port ${PORT}!`),
);