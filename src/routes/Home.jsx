import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "./../App";

function Home() {
    const { state, dispatch } = useContext(Context);

    console.log(state, dispatch);

    return (
        <div>
            <form action={ `http://localhost:3001/media/upload` } method="post" encType="multipart/form-data">
                <input type="file" name="avatar" />                
                <input type="submit" name="upload-button" value="Upload" />
            </form>

            <Link to="/post/5">Post #5</Link>
        </div>
    );
}

export default Home;