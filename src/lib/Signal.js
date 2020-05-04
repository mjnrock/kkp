import Alert from "./Alert";

export default class Signal extends Alert {
    static Types = {
        UPDATE: "update",
        COMMAND: "command",
    };
    
    constructor(type, data) {
        super(type);

        this.data = data;
    }

    static Conforms(obj) {
        try {
            if(typeof obj === "object") {
                return Alert.Conforms(obj)
                    && "data" in obj;
            }
        } catch(e) {
            return false;
        }

        return false;
    }
};