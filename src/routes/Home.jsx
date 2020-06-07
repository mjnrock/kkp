import React, { Fragment } from "react";
import { Header } from "semantic-ui-react";

function Home() {
    return (
        <Fragment>
            <Header as="h2" color="orange" textAlign="center">
                <Header.Content>Kiki Pupus</Header.Content>
            </Header>
        </Fragment>
    );
}

export default Home;