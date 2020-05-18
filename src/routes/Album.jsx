import React, { Fragment } from "react";

import Images from "./../components/image/package";

function Profile() {
    return (
        <Fragment>
            <Images.Album albumId={ 5 } />
        </Fragment>
    );
}

export default Profile;