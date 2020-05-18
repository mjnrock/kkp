import React, { Fragment, useContext } from "react";
import { Context } from "./../App";
import { Header } from "semantic-ui-react";

function Home() {
    const { state, dispatch } = useContext(Context);

    console.log(state, dispatch);

    return (
        <Fragment>
            <Header as="h2" color="orange" textAlign="center">
                <Header.Content>Kiki Pupus</Header.Content>
            </Header>
        </Fragment>
    );
}

export default Home;