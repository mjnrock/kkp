import React, { useContext } from "react";
import { Segment, Image, Header, Divider } from "semantic-ui-react";

import { Context } from "./../../App";
import ReactionBar from "./../comment/ReactionBar";
import InputComment from "./../comment/InputComment";
import Thread from "./../comment/Thread";
import { useState } from "react";

function Post(props) {
    const { state } = useContext(Context);
    const { post } = props;
    const [ reactions, setReactions ] = useState(post.PostReactions || []);

    function onReaction(emoji) {        
        fetch("http://192.168.86.100:3001/post/react", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-Auth": state.auth.token
            },
            body: JSON.stringify({
                "post": post.PostUUID,
                "entity": state.user.EntityUUID,
                "reaction": emoji,
            })
        })
        .then(response => response.json())
        .then(data => {
            if(typeof data.PostReactions === "string") {
                data.PostReactions = JSON.parse(data.PostReactions);
            }

            setReactions(data.PostReactions);
        })
        .catch(e => null);
    }

    return (
        <Segment>
            <Header as="h2" color="orange" textAlign="center">
                <Header.Content>Post #{ post.PostUUID }</Header.Content>
            </Header>

            <Segment inverted>
                <Image src={ `http://192.168.86.100:3001/img/${ post.Filename }` } centered />
            </Segment>
            <ReactionBar onReaction={ onReaction } reactions={ reactions || [] } />

            <Divider horizontal>Comments</Divider>
            
            <InputComment onSubmitComment={ console.log } />

            <Thread posts={ post.PostChildren }/>
        </Segment>
    );
}

export default Post;