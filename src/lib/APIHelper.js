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

    Get(endpoint) {
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

    Post(endpoint, payload, { isJson = false } = {}) {
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

    Form(endpoint, payload, params = {}) {
        if(typeof payload !== "object") {
            return new Promise();
        }

        if(endpoint[ 0 ] === "/") {
            endpoint = endpoint.substring(1);
        }
        
        let formData = new FormData();

        Object.entries(payload).forEach(([ key, value ]) => {
            formData.append(key, value);
        });

        let url = new URL(`${ this.server }/${ endpoint }`);
        url.search = new URLSearchParams(params).toString();

        return fetch(url, {
            method: "POST",
            headers: {
                "X-Auth": this.token
            },
            body: formData,
        });
    }
}