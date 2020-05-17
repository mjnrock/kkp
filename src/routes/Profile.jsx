import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "./../App";
import { Button } from "semantic-ui-react";

function Profile() {
    const { state, dispatch } = useContext(Context);

    console.log(state, dispatch);

    return (
        <div>
            <h1>Profile</h1>
            <Button as={ Link } to="/post/5">Post #5</Button>
        </div>
    );
}

export default Profile;