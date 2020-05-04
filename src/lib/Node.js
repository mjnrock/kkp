import Alert from "./Alert";
import Signal from "./Signal";
import Command from "./Command";

export default class Node {
    constructor({ state, subscribers, onreceive, onalert, onsignal, oncommand } = {}, { allowCommands = false, emitUpdateSignal = false } = {}) {
        this._state = state || {};

        this._subscribers = subscribers || [];
        this._handlers = {
            onreceive,
            onalert,
            onsignal,
            oncommand,
        };

        this._config = {
            emitUpdateSignal,
            allowCommands
        };
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
    
        if(this._config.emitUpdateSignal === true) {
            this.emit(new UpdateSignal(
                previous,
                this._state
            ));
        }
    }

    get config() {
        return this._config;
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

    subscribe(nodeOrFn) {
        if(nodeOrFn instanceof Node || typeof nodeOrFn === "function") {
            this._subscribers.push(nodeOrFn);
        }

        return this;
    }
    unsubscribe(nodeOrFn) {
        if(nodeOrFn instanceof Node || typeof nodeOrFn === "function") {
            this._subscribers = this._subscribers.filter(sub => !Object.is(sub, nodeOrFn));
        }

        return this;
    }

    receive(alert) {
        if(Alert.Conforms(alert)) {
            if(Signal.Conforms(alert)) {
                if(this._config.allowCommands === true && Command.Conforms(alert) && typeof this[ alert.data.fn ] === "function") {
                    Node.AsyncExecuter(this, this._handlers.oncommand, alert);
                }

                Node.AsyncExecuter(this, this._handlers.onsignal, alert);
            } else {
                Node.AsyncExecuter(this, this._handlers.onalert, alert);
            }

            Node.AsyncExecuter(this, this._handlers.onreceive, alert);
        }
    }
    emit(alert) {
        if(Alert.Conforms(alert)) {
            for(let subscriber of this._subscribers) {
                if(subscriber instanceof Node) {
                    subscriber.receive(alert);
                } else if(typeof subscriber === "function") {
                    subscriber(alert);
                }
            }
        }

        return this;
    }
    
    alert(type) {
        this.emit(new Alert(type));

        return this;
    }
    signal(type, data) {
        this.emit(new Signal(type, data));

        return this;
    }

    static AsyncExecuter(target, fn, ...args) {
        if(typeof fn === "function") {
            setImmediate
                ? setImmediate(() => fn.call(target, ...args))
                : setTimeout(() => fn.call(target, ...args), 0);
        }
    }
};