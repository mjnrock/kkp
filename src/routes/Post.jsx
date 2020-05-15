import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../App";
import { Segment, Image, Header, Divider } from "semantic-ui-react";
import Thread from "../components/comment/Thread";
import ReactionBar from "../components/comment/ReactionBar";
import InputComment from "../components/comment/InputComment";

function Post() {
    const { state, dispatch } = useContext(Context);
    const { postId } = useParams();
    const [ posts, setPosts ] = useState([]);

    console.log(state, dispatch, postId);

    useEffect(() => {
        fetch(`http://localhost:3001/post/${ postId || 5 }`)
        .then(response => response.json())
        .then(setPosts);
        // eslint-disable-next-line
    }, []);

    console.log(posts);

    if(posts.length) {
        return (
            <Segment>
                <Header as="h2" color="orange" textAlign="center">
                    <Header.Content>Post #{ postId }</Header.Content>
                </Header>

                <Segment inverted>
                    <Image src={ `http://localhost:3001/image/${ postId }` } centered />
                </Segment>
                <ReactionBar onReaction={ console.log } reactions={ [] } />

                <Divider horizontal>Comments</Divider>
                
                <InputComment onSubmitComment={ console.log } />

                <Thread posts={ posts }/>
            </Segment>
        );
    }

    return (
        <div>Loading...</div>
    )
}

export default Post;