import express from "express";

import Lib from "./lib/package";
import Routes from "./routes/package";

const APP = express();
const PORT = 3001;

APP.use(express.urlencoded({ extended: true }));
APP.use(express.json({ limit: "10MB" }));
APP.use(express.raw());
APP.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Auth");
    //? Whatever middleware work .next() is doing is ESSENTIAL to actually making this work
    next();
});
APP.use("/img", express.static(__dirname + "/data/image"));

APP.disable("x-powered-by");

const RoutesObject = {
    RootDirectory: __dirname,
    DatabaseHelper: new Lib.DatabaseHelper({
        connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: "",
        database: "kkp",
    }),
    TokenHelper: new Lib.TokenHelper({
        password: Date.now(),
    })
};

APP.post("/login", Routes.Login(RoutesObject));
APP.post("/signup", Routes.Signup(RoutesObject));

APP.post("/post/reply", Routes.Post.Reply(RoutesObject));
APP.post("/post/react", Routes.Post.React(RoutesObject));
APP.post("/image/upload", Routes.Image.UploadImage(RoutesObject));
APP.post("/image/modify", Routes.Image.ModifyImage(RoutesObject));

APP.get("/entity/:handle", Routes.Entity.GetBasicInfo(RoutesObject));
APP.get("/friends/:handle", Routes.Friends.GetBasicInfo(RoutesObject));
APP.get("/family/:handle", Routes.Family.GetBasicInfo(RoutesObject));
APP.get("/post/:uuid", Routes.Post.GetBasicInfo(RoutesObject));
APP.get("/feed/:handle", Routes.Feed.GetFeed(RoutesObject));

APP.listen(PORT, () =>
    console.log(`KiKi Pupus API listening on port: ${ PORT }`),
);