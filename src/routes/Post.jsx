import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Segment, Image, Header, Divider } from "semantic-ui-react";

import Thread from "../components/comment/Thread";
import ReactionBar from "../components/comment/ReactionBar";
import InputComment from "../components/comment/InputComment";

function Post() {
    const { postId } = useParams();
    const [ post, setPost ] = useState({});

    useEffect(() => {
        if(!Object.keys(post).length) {
            fetch(`http://localhost:3001/post/${ postId }`)
            .then(response => response.json())
            .then(setPost);
        }
        // eslint-disable-next-line
    }, []);

    console.log(post);

    if(!Object.keys(post).length) {
        return (
            <div>Loading...</div>
        );
    }
    
    return (
        <Segment>
            <Header as="h2" color="orange" textAlign="center">
                <Header.Content>Post #{ post.id }</Header.Content>
            </Header>

            <Segment inverted>
                <Image src={ `http://localhost:3001/img/${ post.image }` } centered />
            </Segment>
            <ReactionBar onReaction={ console.log } reactions={ [] } />

            <Divider horizontal>Comments</Divider>
            
            <InputComment onSubmitComment={ console.log } />

            <Thread posts={ post.children }/>
        </Segment>
    );
}

export default Post;