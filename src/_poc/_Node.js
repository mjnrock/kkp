export default class Node {
    constructor({ state, listeners } = {}) {
        this._state = state || {};
        this._listeners = listeners || {};
    }

    get $() {
        return this._state;
    }
    get state() {
        return this._state;
    }
    set state(state) {
        let previous = this._state;
        this._state = state;

        this.trigger("update", {
            previous,
            current: state,
        });
    }

    prop(key, value) {
        if(typeof this.state === "object") {
            if(value !== void 0) {
                let state = this._state;

                state[ key ] = value;

                this.state = state;
            }

            return this._state[ key ];
        }
    }
    aprop(key, index, value) {
        if(typeof this.state === "object") {
            if(Array.isArray(this._state[ key ]) && index !== void 0) {
                if(value !== void 0) {
                    let state = this._state;
    
                    if(index === true) {
                        state[ key ].push(value);
                    } else {
                        state[ key ][ index ] = value;
                    }
    
                    this.state = state;
                }

                return this._state[ key ][ index ];
            }
        }
    }

    receive(event, ...payload) {
        let fn = this[ `on${ event }`].bind(this);

        if(typeof fn === "function") {
            fn(...payload);
        }
    }

    on(event, callback) {
        if(!Array.isArray(this._listeners[ event ])) {
            this._listeners[ event ] = [];
        }

        this._listeners[ event ].push(callback);

        return this;
    }
    off(event, callback) {
        if(!Array.isArray(this._listeners[ event ])) {
            return;
        }

        this._listeners[ event ] = this._listeners[ event ].filter(l => l !== callback);

        return this;
    }
    trigger(event, ...payload) {
        this.receive(event, ...payload);

        for(let listener of (this._listeners[ event ] || [])) {
            if(listener instanceof Node) {
                listener.trigger(event, ...payload);
            } else {
                listener(event, ...payload);
            }
        }

        return this;
    }
};