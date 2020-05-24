import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Message, Icon, Segment } from "semantic-ui-react";

import PostComponent from "./../components/post/Post";

function Post() {
    const { uuid } = useParams();
    const [ post, setPost ] = useState({});

    useEffect(() => {
        if(!Object.keys(post).length) {
            fetch(`http://192.168.86.100:3001/post/${ uuid }`)
            .then(response => response.json())
            .then(setPost)
            .catch(e => setPost());
        }
        // eslint-disable-next-line
    }, []);

    if(!post) {
        return (
            <Segment>
                <Link to="/">
                    <Message icon negative>
                        <Icon name="x" />
                        <Message.Content>
                            <Message.Header>That's Not a Thing :/</Message.Header>
                            It doesn't look like that thing exists.
                        </Message.Content>
                    </Message>
                </Link>
            </Segment>
        );
    }

    if(!Object.keys(post).length) {
        return (
            <div>Loading...</div>
        );
    }
    
    return (
        <PostComponent post={ post } />
    );
}

export default Post;