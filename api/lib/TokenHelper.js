import crypto from "crypto";

export default class TokenHelper {
    constructor({ password, iv, hashType = "sha256", algorithm = "aes-256-ctr" } = {}) {
        this._hashType = hashType;
        this._algorithm = algorithm;

        this._iv = iv || crypto.randomBytes(16).toString("hex").slice(0, 16);
        this._key = crypto.createHash(hashType).update(String(password)).digest("base64").substr(0, 32);

        return Object.freeze(this);
    }

    CreateToken({ expiration, ...obj } = {}) {
        try {
            let text = JSON.stringify({
                ...obj,
                timestamp: Date.now() + (new Date().getTimezoneOffset() * 60 * 1000),  // UTC
                expiration
            });
            
            let cipher = crypto.createCipheriv(this._algorithm, this._key, this._iv);
            let encrypted = cipher.update(String(text), "utf8", "hex") + cipher.final("hex");
    
            return encrypted;
        } catch(e) {
            return false;
        }
    }
    DecryptToken(token) {
        try {
            let decipher = crypto.createDecipheriv(this._algorithm, this._key, this._iv);
            let decrypted = decipher.update(String(token), "hex", "utf8");
            
            decrypted += decipher.final("utf8");
    
            return JSON.parse(decrypted);
        } catch(e) {
            return false;
        }
    }
};