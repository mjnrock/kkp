import React, { useContext, useState } from "react";
import { Segment, Image, Header, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { Context } from "./../../App";

import ReactionBar from "./../comment/ReactionBar";
import InputComment from "./../comment/InputComment";
import Thread from "./../comment/Thread";

function Post(props) {
    const { state, config } = useContext(Context);
    const { post } = props;
    const [ reactions, setReactions ] = useState(post.PostReactions || []);
    const [ children, setChildren ] = useState(post.PostChildren || []);

    function onReaction(emoji) {
        config.api.POST("post/react", {
            "post": post.PostUUID,
            "entity": state.user.EntityUUID,
            "reaction": emoji,
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

    function onSubmitComment(comment, setComment) {
        if(comment.length > 0) {
            setComment("");
            
            config.api.POST("post/reply", {
                "post": post.PostUUID,
                "entity": state.user.EntityUUID,
                "reply": comment,
            })
            .then(response => response.json())
            .then(data => {
                if(typeof data.PostChildren === "string") {
                    data.PostChildren = JSON.parse(data.PostChildren);
                }
    
                setChildren(data.PostChildren);
            })
            .catch(e => null);
        }
    }

    return (
        <Segment>
            <Header as="h2" color="orange" textAlign="center">
                <Header.Content as={ Link } to={ `/studio/${ post.PostUUID }` } >Post #{ post.PostUUID }</Header.Content>
            </Header>

            <Segment inverted>
                <Image src={ `http://192.168.86.100:3001/img/${ post.Filename }` } centered style={{ maxHeight: 400 }} />
            </Segment>
            <ReactionBar onReaction={ onReaction } reactions={ reactions || [] } />

            <Divider horizontal>Comments</Divider>
            
            <InputComment onSubmitComment={ onSubmitComment } />

            <Thread posts={ children || [] }/>
        </Segment>
    );
}

export default Post;