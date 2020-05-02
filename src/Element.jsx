import React, { useContext, Fragment } from "react";
import Context from "./Context";

function Element() {
    const CTX = useContext(Context.Context);

    return (
        <Fragment>
            <div>{ CTX.test }</div>
            <div>{ CTX.test2.testA }</div>
            <div>{ CTX.test2.testB }</div>
        </Fragment>
    );
}

export default Element;