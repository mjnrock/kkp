export default class APIHelper {
    constructor(server, token) {
        this._server = server;
        this._token = token;
    }

    get server() {
        return this._server;
    }
    get token() {
        return this._token;
    }

    GET(endpoint) {
        if(endpoint[ 0 ] === "/") {
            endpoint = endpoint.substring(1);
        }
    
        return fetch(`${ this.server }/${ endpoint }`, {
            method: "GET",
            headers: {
                "X-Auth": this.token
            }
        });
    }

    POST(endpoint, payload, { isJson = false } = {}) {
        if(typeof payload !== "object") {
            return new Promise();
        }

        if(endpoint[ 0 ] === "/") {
            endpoint = endpoint.substring(1);
        }
    
        return fetch(`${ this.server }/${ endpoint }`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-Auth": this.token
            },
            body: isJson ? payload : JSON.stringify(payload)
        });
    }
}