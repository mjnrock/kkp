import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Message, Icon, Segment } from "semantic-ui-react";

import { Context } from "./../App";
import PostComponent from "./../components/post/Post";

function Post() {
    const { config } = useContext(Context);
    const { uuid } = useParams();
    const [ post, setPost ] = useState({});

    useEffect(() => {
        if(!Object.keys(post).length) {
            config.api.Get(`post/${ uuid }`)
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