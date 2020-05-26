import React, { Fragment, useEffect } from "react";
import { Header, Divider, Icon, Card, Segment, Item, Accordion, List, Image, Button } from "semantic-ui-react";
import { useParams, Link } from "react-router-dom";

import ImageBanner from "./../components/image/ImageBanner";
import PetCard from "../components/profile/PetCard";
import { useState } from "react";
import PersonCard from "../components/profile/PersonCard";

function Profile() {
    const [ entity, setEntity ] = useState();
    const [ family, setFamily ] = useState([]);
    const [ friends, setFriends ] = useState([]);
    const { handle } = useParams();

    useEffect(() => {
        if(handle) {
            fetch(`http://192.168.86.100:3001/entity/${ handle }`)
            .then(response => response.json())
            .then(setEntity)
            .catch(e => setEntity());
            
            fetch(`http://192.168.86.100:3001/family/${ handle }`)
            .then(response => response.json())
            .then(data => {
                for(let i in data) {
                    if(typeof data[ i ].EntityDetail === "string") {
                        data[ i ].EntityDetail = JSON.parse(data[ i ].EntityDetail);
                    }
                }
                
                setFamily(data);
            })
            .catch(e => setFamily([]));

            fetch(`http://192.168.86.100:3001/friends/${ handle }`)
            .then(response => response.json())
            .then(setFriends)
            .catch(e => setFriends([]));
        }
    }, [ handle ]);

    if(!entity) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <Fragment>            
            <Segment basic>
                <Header as="h2" color={ entity.EntityType === "Human" ? "green" : "orange" } textAlign="center">
                    <Header.Content>
                        { entity.EntityName }
                        <Header as="h4" color="grey" textAlign="center">
                            <Header.Content>@{ entity.EntityHandle }</Header.Content>
                        </Header>
                    </Header.Content>
                </Header>

                {/* <ImageBanner name={ entity.AssetFilename } /> */}
                <ImageBanner name={ `${ entity.EntityHandle }.jpg` } />

                <Accordion>
                    <Accordion.Title
                        active={ true }
                        index={ 0 }
                    >
                        <Divider horizontal>
                            <Header as="h4" color="grey">
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

                    <Accordion.Title
                        active={ true }
                        index={ 0 }
                    >
                        <Divider horizontal>
                            <Header as="h4" color="grey">
                                <Icon name="paw" />
                                { family && family[ 0 ] ? family[ 0 ].GroupName : null } Family
                            </Header>
                        </Divider>
                    </Accordion.Title>

                    <Accordion.Content active={ true }>
                        <Card.Group itemsPerRow={ 3 } >
                            {
                                family.map(member => {
                                    if(member.EntityUUID === entity.EntityUUID) {
                                        return null;
                                    }

                                    if(member.EntityType === "Human") {
                                        return (
                                            <PersonCard
                                                key={ member.EntityUUID }
                                                entity={ member }
                                            />
                                        );
                                    }
                                    
                                    return (
                                        <PetCard
                                            key={ member.EntityUUID }
                                            entity={ member }
                                        />
                                    );
                                })
                            }
                        </Card.Group>
                    </Accordion.Content>

                    <Accordion.Title
                        active={ true }
                        index={ 0 }
                    >
                        <Divider horizontal>
                            <Header as="h4" color="grey">
                                <Icon name="users" />
                                Friends ({ friends.length })
                            </Header>
                        </Divider>
                    </Accordion.Title>

                    <Accordion.Content active={ true }>
                        <List selection verticalAlign="middle">
                            {
                                friends.length ? (
                                    friends.map(friend => (
                                        <List.Item key={ friend.FriendHandle } as={ Link } to={ `/profile/${ friend.FriendHandle }` }>
                                            <Image avatar src={ `http://192.168.86.100:3001/img/${ friend.FriendHandle }.jpg` } />
                                            <List.Content>
                                                <List.Header>{ friend.FriendHandle }</List.Header>
                                            </List.Content>
                                        </List.Item>
                                    ))
                                ) : (
                                    <Button color={ entity.EntityType === "Human" ? "green" : "orange" } inverted fluid>
                                        Add Friend
                                    </Button>
                                )
                            }
                        </List>
                    </Accordion.Content>
                </Accordion>
            </Segment>
        </Fragment>
    );
}

export default Profile;