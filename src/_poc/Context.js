import React from "react";

const Context = React.createContext({
    _lastUpdate: null,
    
    test: 14,
    test2: {
        testA: 1,
        testB: 2
    },
    inc() {
        this.test += 1;
        this.test2.testA += 1;
        this.test2.testB += 1;

        this._lastUpdate = Date.now();

        return this._lastUpdate;
    }
});

export default {
    Context,
    Consumer: Context.Consumer,
    Provider: Context.Provider,
};