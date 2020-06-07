import path from "path";
import multer from "multer";

export default obj => (req, res) => {
    const token = obj.TokenHelper.DecryptToken(req.header("X-Auth"));
    const entity = req.query.entity;
    let DatabaseHelperdata = {};
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
                obj.DatabaseHelper.Call("CreateImagePost", [ entity, (path.extname(file.originalname) || "").replace(/[^0-9a-z]/gi, ""), [ "@NULL" ] ])
                .then(results => {     
                    DatabaseHelperdata = (results.first || {});
                    
                    cb(null, DatabaseHelperdata.Filename);
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

            return res.send(DatabaseHelperdata);
        });
    }
};