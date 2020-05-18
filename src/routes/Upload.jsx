import React, { Fragment } from "react";

import Images from "../components/image/package";

function Upload() {
    return (
        <Fragment>
            <form action={ `http://localhost:3001/media/upload` } method="post" encType="multipart/form-data">
                <input type="file" name="avatar" />                
                <input type="submit" name="upload-button" value="Upload" />
            </form>
        </Fragment>
    );
}

export default Upload;