import Signal from "./Signal";

export default class Command extends Signal {    
    constructor(fn, ...args) {
        super(Signal.Types.COMMAND, {
            fn,
            args
        });
    }

    get fn() {
        return this.data.fn;
    }
    get args() {
        return this.data.args;
    }

    arg(index) {
        if(index !== void 0 && index !== null) {
            return this.args[ index ];
        }

        return this.args;
    }

    static Conforms(obj) {
        try {
            if(typeof obj === "object") {
                return Alert.Conforms(obj)
                    && "data" in obj
                    && type === Signal.Types.COMMAND
                    && "fn" in obj.data
                    && "args" in obj.data;
            }
        } catch(e) {
            return false;
        }

        return false;
    }
};