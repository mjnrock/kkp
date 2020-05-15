import React, { useContext } from "react";
import { Context } from "./../App";

function Home() {
    const { state, dispatch } = useContext(Context);

    console.log(state, dispatch);

    return (
        <div>Home</div>
    );
}

export default Home;