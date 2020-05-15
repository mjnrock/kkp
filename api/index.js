import express from "express";
import fs from "fs";

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

APP.get("/feed", (req, res) => {
    fs.readFile("./data/messages.json", function (err, buff) {
        return res.send(buff.toString());
    });
});
APP.post("/message/", (req, res) => {
    const filepath = "./data/messages.json";
    const message = req.body;

    fs.readFile(filepath, "utf8", (err, data) => {
        if(err) {
            console.log(err);
        } else {
            let obj = JSON.parse(data);
            obj.push(message);

            let json = JSON.stringify(obj);
            fs.writeFile(filepath, json, () => {
                res.sendStatus(200);
            });
        }
    });
});

APP.listen(PORT, () =>
    console.log(`KiKi Pupus API listening on port ${PORT}!`),
);