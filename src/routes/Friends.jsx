import React, { useState, useEffect, useContext } from "react";
import { Card, Image, Segment, Header, Divider, Icon } from "semantic-ui-react";
import { useParams, Link } from "react-router-dom";

import { Context } from "./../App";

function Friends() {
    const { config } = useContext(Context);
    const [ friends, setFriends ] = useState([]);
    const { handle } = useParams();

    useEffect(() => {
        if(handle) {
            config.api.Get(`friends/${ handle }`)
            .then(response => response.json())
            .then(setFriends)
        }
        // eslint-disable-next-line
    }, []);

    console.log(friends)

    if(!friends.length) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <Segment>
            <Header as="h2" color="orange" textAlign="center">
                { handle }
            </Header>

            <Divider horizontal>
                <Header as="h4">
                    <Icon name="users" />
                    Friends ({ friends.length })
                </Header>
            </Divider>

            <Card.Group>
                {
                    friends.map(friend => (
                        <Card key={ friend.FriendUUID } as={ Link } to={ `/profile/${ friend.FriendHandle }` }>
                            <Card.Content>
                                <Image
                                    floated="left"
                                    size="mini"
                                    src={ config.api.Image(`${ friend.FriendHandle }.jpg`) }
                                />
                                <Card.Header>{ friend.FriendName }</Card.Header>
                                <Card.Meta>{ friend.FriendHandle }</Card.Meta>
                                <Card.Description>
                                    { friend.FriendDetail }
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    ))
                }
            </Card.Group>
        </Segment>
    );
}

export default Friends;