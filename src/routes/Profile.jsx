import React, { Fragment, useContext } from "react";
import { Header } from "semantic-ui-react";

import { Context } from "./../App";
import ImageBanner from "./../components/image/ImageBanner";

function Profile() {
    const { state, dispatch } = useContext(Context);

    console.log(state, dispatch);

    return (
        <Fragment>
            <Header as="h2" color="orange" textAlign="center">
                <Header.Content>
                    { state.auth.first } { state.auth.last }
                    <Header as="h4" color="grey" textAlign="center">
                        <Header.Content>@{ state.auth.user }</Header.Content>
                    </Header>
                </Header.Content>
            </Header>

            <ImageBanner name="avatar-1589737550510.gif" />
        </Fragment>
    );
}

export default Profile;