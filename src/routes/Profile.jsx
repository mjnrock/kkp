import React, { Fragment, useEffect } from "react";
import { Header, Divider, Icon, Card, Segment, Item, Accordion, List, Image } from "semantic-ui-react";
import { useParams, Link } from "react-router-dom";

import ImageBanner from "./../components/image/ImageBanner";
import PetCard from "../components/profile/PetCard";
import { useState } from "react";

function Profile() {
    const [ entity, setEntity ] = useState();
    const [ friends, setFriends ] = useState([]);
    const { handle } = useParams();

    useEffect(() => {
        if(handle) {
            fetch(`http://192.168.86.100:3001/entity/${ handle }`)
            .then(response => response.json())
            .then(setEntity);

            fetch(`http://192.168.86.100:3001/friends/${ handle }`)
            .then(response => response.json())
            .then(setFriends);
        }
    }, [ handle ]);

    if(!entity) {
        return (
            <div>Loading...</div>
        )
    }

    console.log(friends);

    return (
        <Fragment>            
            <Segment basic>
                <Header as="h2" color="orange" textAlign="center">
                    <Header.Content>
                        { entity.EntityName }
                        <Header as="h4" color="grey" textAlign="center">
                            <Header.Content>@{ entity.EntityHandle }</Header.Content>
                        </Header>
                    </Header.Content>
                </Header>

                <ImageBanner name={ entity.AssetFilename } />

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
                                { entity.EntityDetail }
                            </Item.Content>
                        </Item>
                    </Accordion.Content>

                    {/* <Accordion.Title
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
                    </Accordion.Content> */}

                    <Accordion.Title
                        active={ true }
                        index={ 0 }
                    >
                        <Divider horizontal>
                            <Header as="h4">
                                <Icon name="users" />
                                Friends ({ friends.length })
                            </Header>
                        </Divider>
                    </Accordion.Title>

                    <Accordion.Content active={ true }>
                        <List selection verticalAlign="middle">
                            {
                                friends.map(friend => (
                                    <List.Item key={ friend.FriendHandle } as={ Link } to={ `/profile/${ friend.FriendHandle }` }>
                                        <Image avatar src={ `http://192.168.86.100:3001/img/${ friend.FriendHandle }.jpg` } />
                                        <List.Content>
                                            <List.Header>{ friend.FriendHandle }</List.Header>
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