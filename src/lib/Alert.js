export default class Alert {
    constructor(type) {
        this.type = type;
        this.timestamp = Date.now();
    }

    static Conforms(obj) {
        try {
            if(typeof obj === "object") {
                return "type" in obj
                    && "timestamp" in obj;
            }
        } catch(e) {
            return false;
        }

        return false;
    }
};