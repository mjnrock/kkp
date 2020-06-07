import fs from "fs";
import path from "path";
import isBase64 from "is-base64";

export default obj => (req, res) => {
    const token = obj.TOKENIZER.DecryptToken(req.header("X-Auth"));
    const message = req.body;
    const { base64, filename } = message;
    console.log("/image/modify", filename, token);

    if(token && isBase64(base64, { mimeRequired: true, allowEmpty: false })) {
        const data = base64.replace(/^data:image\/\w+;base64,/, "");
        fs.writeFile(path.join(obj.RootDirectory + "/data/image/" + filename), data, { encoding: "base64" }, error => {
            if(error) {
                return res.sendStatus(500);
            }

            return res.sendStatus(200);
        });
    }
};