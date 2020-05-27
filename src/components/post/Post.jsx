import React, { useContext, useState } from "react";
import { Segment, Image, Header, Divider, Icon } from "semantic-ui-react";
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
    const [ isCommentsVisible, setIsCommentsVisible ] = useState(false);

    function onReaction(emoji) {
        config.api.Post("post/react", {
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
            
            config.api.Post("post/reply", {
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
                setIsCommentsVisible(true);
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
                <Image src={ config.api.Image(post.Filename) } centered style={{ maxHeight: 400 }} />
            </Segment>
            <ReactionBar onReaction={ onReaction } reactions={ reactions || [] } />

            <InputComment onSubmitComment={ onSubmitComment } />

            {
                children.length ? (
                    <>
                        <Divider horizontal style={{ cursor: "pointer" }} onClick={ e => setIsCommentsVisible(!isCommentsVisible) }>
                            <Icon name={ isCommentsVisible ? "angle down" : "angle up" } className={ isCommentsVisible ? "grey" : "orange" } />
                            &nbsp;{ isCommentsVisible ? "Hide" : "Show" }&nbsp;Comments
                            &nbsp;<Icon name={ isCommentsVisible ? "angle down" : "angle up" } color={ isCommentsVisible ? "grey" : "orange" } />
                        </Divider>
                        
            
                        {
                            isCommentsVisible ? (
                                <Thread posts={ children || [] }/>
                            ) : null
                        }
                    </>
                ) : null
            }
        </Segment>
    );
}

export default Post;