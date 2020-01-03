import React from "react";
import ReactDOM from "react-dom";

import Provider from "./lux/Provider";
import App from "./App.jsx";

const lux = {
    Test: 1,
    Bobs: {
        Cat: 5
    }
};

ReactDOM.render(
    <Provider lux={ lux }>
        <App />
    </Provider>,
    document.getElementById("root")
);