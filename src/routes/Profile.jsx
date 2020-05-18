import React, { Fragment, useContext, useEffect } from "react";
import { Header, Divider, Icon, Card, Segment, Item, Accordion } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { Context } from "./../App";
import ImageBanner from "./../components/image/ImageBanner";
import PetCard from "../components/profile/PetCard";
import { useState } from "react";

function Profile() {
    const [ user, setUser ] = useState([]);
    const [ family, setFamily ] = useState([]);
    const { state, dispatch } = useContext(Context);
    const { handle } = useParams();

    useEffect(() => {
        if(handle) {
            fetch(`http://localhost:3001/user/${ handle }`)
            .then(response => response.json())
            .then(setUser);

            fetch(`http://localhost:3001/family/${ handle }`)
            .then(response => response.json())
            .then(setFamily);
        }
    }, [ handle ]);

    console.log(state, dispatch);

    return (
        <Fragment>            
            <Segment basic>
                <Header as="h2" color="orange" textAlign="center">
                    <Header.Content>
                        { state.auth.first } { state.auth.last }
                        <Header as="h4" color="grey" textAlign="center">
                            <Header.Content>@{ state.auth.user }</Header.Content>
                        </Header>
                    </Header.Content>
                </Header>

                <ImageBanner name="profile-1.jpg" />

                <Accordion>
                    <Accordion.Title
                        active={ true }
                        index={ 0 }
                    >
                        <Divider horizontal>
                            <Header as="h4">
                                <Icon name="lab" />
                                Bio
                            </Header>
                        </Divider>
                    </Accordion.Title>

                    <Accordion.Content active={ true }>
                        <Item>
                            <Item.Content>
                                { user.bio }
                            </Item.Content>
                        </Item>
                    </Accordion.Content>

                    <Accordion.Title
                        active={ true }
                        index={ 0 }
                    >
                        <Divider horizontal>
                            <Header as="h4">
                                <Icon name="paw" />
                                Family
                            </Header>
                        </Divider>
                    </Accordion.Title>

                    <Accordion.Content active={ true }>
                        <Card.Group itemsPerRow={ 3 } >
                            {
                                family.map(info => (
                                    <PetCard
                                        key={ info.name }
                                        info={ info }
                                    />
                                ))
                            }
                        </Card.Group>
                    </Accordion.Content>
                </Accordion>
            </Segment>
        </Fragment>
    );
}

export default Profile;