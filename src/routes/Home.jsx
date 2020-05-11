import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <Fragment>
            <p>This is the home page</p>

            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/feed">Feed</Link>
            <Link to="/album">Album</Link>
            <Link to="/upload">Upload</Link>
        </Fragment>
    );
}