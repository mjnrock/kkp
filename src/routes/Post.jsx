import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Segment, Image, Header, Divider } from "semantic-ui-react";

import Thread from "../components/comment/Thread";
import ReactionBar from "../components/comment/ReactionBar";
import InputComment from "../components/comment/InputComment";

function Post() {
    const { uuid } = useParams();
    const [ post, setPost ] = useState({});

    useEffect(() => {
        if(!Object.keys(post).length) {
            fetch(`http://192.168.86.100:3001/post/${ uuid }`)
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
                <Header.Content>Post #{ post.PostUUID }</Header.Content>
            </Header>

            <Segment inverted>
                <Image src={ `http://192.168.86.100:3001/img/${ post.Filename }` } centered />
            </Segment>
            <ReactionBar onReaction={ console.log } reactions={ [] } />

            <Divider horizontal>Comments</Divider>
            
            <InputComment onSubmitComment={ console.log } />

            <Thread posts={ post.PostChildren }/>
        </Segment>
    );
}

export default Post;