import React, { useState, useEffect } from "react";
import { Card, Image, Segment, Header, Divider, Icon } from "semantic-ui-react";
import { useParams, Link } from "react-router-dom";

function Friends() {
    const [ friends, setFriends ] = useState([]);
    const { handle } = useParams();

    useEffect(() => {
        if(handle) {
            fetch(`http://192.168.86.100:3001/friends/${ handle }`)
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
                                    floated="right"
                                    size="mini"
                                    src={ `http://192.168.86.100:3001/img/${ friend.FriendUUID }.jpg` }
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