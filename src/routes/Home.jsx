import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "./../App";

function Home() {
    const { state, dispatch } = useContext(Context);

    console.log(state, dispatch);

    return (
        <div>
            <Link to="/post/5">Post #5</Link>
        </div>
    );
}

export default Home;