import React from "react";
import ReactDOM from "react-dom";

import Provider from "./lux/Provider";
import Lux from "@lespantsfancy/lux";
import App from "./App";

const lux = {
    Test: 1,
    Bobs: {
        Cat: 5
    }
};
const lux2 = new Lux.Core.ClassDecorators.StateEvents();
lux2.prop("Lux", lux);

setTimeout(() => {
    // let a = lux2.prop("Lux");
    // a[ "Test" ] = 15;

    // lux2.prop("Lux", a);
    
    lux2.oprop("Lux", "Test", 9);
}, 1000);

ReactDOM.render(
    <Provider lux={ lux2 }>
        <App />
    </Provider>,
    document.getElementById("root")
);