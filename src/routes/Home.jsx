import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ColorPicker from "../components/comment/ColorPicker";

export default function Home() {
    return (
        <Fragment>
            <p>This is the home page</p>

            <ColorPicker hue={ 250 } favorites={ [ "#FFF", "#000" ] } />

            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/feed">Feed</Link>
            <Link to="/album">Album</Link>
            <Link to="/upload">Upload</Link>
        </Fragment>
    );
}