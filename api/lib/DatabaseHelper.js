import mysql from "mysql";

export default class DatabaseHelper {
    constructor(config) {
        this.DB = mysql.createPool(config);
    }

    _createArgumentBindings(args = []) {
        if(!Array.isArray(args)) {
            return;
        }

        let params = args.map(arg => {
            if(Array.isArray(arg)) {
                return arg[ 0 ];
            } else if(typeof arg === "object") {
                return arg.out;
            }

            return "?";
        });

        return params.join(",");
    }

    Call(name, args = []) {
        const bindings = this._createArgumentBindings(args);

        return new Promise((resolve, reject) => {
            try {
                this.DB.query(`CALL ${ name }(${ bindings })`, args, (error, results, fields) => {
                    if(error) {
                        reject(error);
                    }
                    if(results && Array.isArray(results)) {
                        resolve({
                            first: (results[ 0 ] || [])[ 0 ],
                            all: results[ 0 ] || [],
                            hasResults: results[ 0 ].length > 0,
                            results,
                            fields
                        });
                    }
                });
            } catch(e) {
                return false;
            }
        })
    }
};