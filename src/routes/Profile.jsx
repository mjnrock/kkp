import React, { Fragment, useEffect } from "react";
import { Header, Divider, Icon, Card, Segment, Item, Accordion, List, Image } from "semantic-ui-react";
import { useParams, Link } from "react-router-dom";

import ImageBanner from "./../components/image/ImageBanner";
import PetCard from "../components/profile/PetCard";
import { useState } from "react";

function Profile() {
    const [ user, setUser ] = useState();
    const [ family, setFamily ] = useState([]);
    const { handle } = useParams();

    useEffect(() => {
        if(handle) {
            fetch(`http://192.168.86.100:3001/user/${ handle }`)
            .then(response => response.json())
            .then(setUser);

            fetch(`http://192.168.86.100:3001/family/${ handle }`)
            .then(response => response.json())
            .then(setFamily);
        }
    }, [ handle ]);

    if(!user) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <Fragment>            
            <Segment basic>
                <Header as="h2" color="orange" textAlign="center">
                    <Header.Content>
                        { user.name.first } { user.name.last }
                        <Header as="h4" color="grey" textAlign="center">
                            <Header.Content>@{ user.handle }</Header.Content>
                        </Header>
                    </Header.Content>
                </Header>

                <ImageBanner name={ `${ handle }.jpg` } />

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

                    <Accordion.Title
                        active={ true }
                        index={ 0 }
                    >
                        <Divider horizontal>
                            <Header as="h4">
                                <Icon name="users" />
                                Friends ({ user.friends.length })
                            </Header>
                        </Divider>
                    </Accordion.Title>

                    <Accordion.Content active={ true }>
                        <List selection verticalAlign="middle">
                            {
                                user.friends.map(friend => (
                                    <List.Item key={ friend } as={ Link } to={ `/profile/${ friend }` }>
                                        <Image avatar src={ `http://192.168.86.100:3001/img/${ friend }.jpg` } />
                                        <List.Content>
                                            <List.Header>{ friend }</List.Header>
                                        </List.Content>
                                    </List.Item>
                                ))
                            }
                        </List>
                    </Accordion.Content>
                </Accordion>
            </Segment>
        </Fragment>
    );
}

export default Profile;