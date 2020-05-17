import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "./../App";
import { Button } from "semantic-ui-react";
import Album from "../components/image/Album";

function Home() {
    const { state, dispatch } = useContext(Context);

    console.log(state, dispatch);

    return (
        <div>
            <Album albumId={ 5 } />

            <hr />
            <form action={ `http://localhost:3001/media/upload` } method="post" encType="multipart/form-data">
                <input type="file" name="avatar" />                
                <input type="submit" name="upload-button" value="Upload" />
            </form>

            <Button as={ Link } to="/post/5">Post #5</Button>
        </div>
    );
}

export default Home;