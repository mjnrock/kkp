import express from "express";
import fs from "fs";
import path from "path";

const APP = express();
const PORT = 3001;

APP.use(express.urlencoded({ extended: true }));
APP.use(express.json());
APP.use(express.raw());
APP.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //? Whatever middleware work .next() is doing is ESSENTIAL to actually making this work
    next();
});
APP.use(express.static(path.join(__dirname, "data")));
// APP.use(serveStatic(path.join(__dirname, "public")));

console.log(path.join(__dirname, "public"));

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

APP.post("/react/post", (req, res) => {
    const filepath = "./data/messages.json";
    const message = req.body;
    const { pid, emoji, token: user } = message;

    console.log("/react/post", message);

    fs.readFile(filepath, "utf8", (err, data) => {
        if(err) {
            console.log(err);
        } else {
            let posts = JSON.parse(data);
            let resPost;
            posts.map(post => {
                if(post.id === pid) {
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

APP.get("/post/:pid", (req, res) => {
    const postId = req.params.pid;
    console.log(`/post/${ postId }`);

    fs.readFile("./data/messages.json", function (err, buff) {
        return res.send(buff.toString());
    });
});

APP.get("/image/:iid", (req, res) => {
    const imageId = "pusheen" || req.params.iid;
    const imageExt = "png";
    const filepath = `/data/image/${ imageId }.${ imageExt }`;
    console.log(`/image/${ imageId }`);

    return res.sendFile(filepath , { root : __dirname });
});

APP.listen(PORT, () =>
    console.log(`KiKi Pupus API listening on port ${PORT}!`),
);