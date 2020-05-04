import Signal from "./Signal";

export default class UpdateSignal extends Signal {
    constructor(previous, current) {
        super(Signal.Types.UPDATE);

        this.data = {
            previous,
            current
        };
    }

    get previous() {
        return this.data.previous;
    }
    get current() {
        return this.data.current;
    }
    
    static Conforms(obj) {
        try {
            if(typeof obj === "object") {
                return Signal.Conforms(obj)
                    && type === Signal.Types.UPDATE
                    && "previous" in obj.data
                    && "current" in obj.data;
            }
        } catch(e) {
            return false;
        }

        return false;
    }
};