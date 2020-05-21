import React, { useState, useEffect } from "react";
import { List, Image, Segment, Header, Divider, Icon } from "semantic-ui-react";
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

            <List selection verticalAlign="middle">
                {
                    friends.map(friend => (
                        <List.Item key={ friend.FriendUUID } as={ Link } to={ `/profile/${ friend.FriendHandle }` }>
                            <Image avatar src={ `http://192.168.86.100:3001/img/${ friend.FriendUUID }.jpg` } />
                            <List.Content>
                                <pre>{ JSON.stringify(friend, null, 2) }</pre>
                            </List.Content>
                        </List.Item>
                    ))
                }
            </List>
        </Segment>
    );
}

export default Friends;