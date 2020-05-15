import React, { useContext } from "react";
import { Context } from "./../App";

import LoginForm from "./../auth/LoginForm";

function Home() {
    const { state, dispatch } = useContext(Context);

    return (
        <div>Home</div>
    );
}

export default Home;