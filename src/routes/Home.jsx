import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <Fragment>
            <p>This is the home page</p>

            <Link to="/login">Login</Link>
        </Fragment>
    );
}