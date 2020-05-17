import React, { useState, useContext } from "react";
import { Comment, Icon } from "semantic-ui-react";

import { Context } from "./../../App";
import Thread from "./Thread";
import ReactionBar from "./ReactionBar";

function Response(props) {
    const { post } = props;

    const { state } = useContext(Context);
    const [ collapsed, setCollapsed ] = useState(false);
    const [ reactions, setReactions ] = useState(post.reactions || []);

    
    function onReaction(emoji) {
        // dispatch({
        //     type: "REACTION",
        //     data: {
        //         emoji,
        //         postId: props.postId
        //     }
        // });

        console.log(post.id, emoji)

        const token = state.auth.token || "Matt";
        
        // if(state.auth.token) {
            fetch(`http://localhost:3001/post/react/`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    
                },
                body: JSON.stringify({
                    "pid": post.id,
                    "emoji": emoji,
                    "token": token
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data) {
                    console.log(data.id, post.id)
                    if(data.id === post.id) {
                        setReactions(data.reactions);
                    }                
                }
            });
        // }   
    }

    return (
        <Comment>
            <Comment.Avatar as="a" src="/assets/pusheen.png" />
            <Comment.Content>
                <Comment.Author as="a">{ post.author }</Comment.Author>

                <Comment.Metadata>
                    <span>{ post.timestamp }</span>
                </Comment.Metadata>
                
                {
                    post.children ? (
                        <Icon style={{ cursor: "pointer" }} size="large" name={ collapsed ? "angle up orange" : "angle down grey" } onClick={ e => setCollapsed(!collapsed) } />
                    ) : null
                }
                
                <Comment.Text>{ post.message }</Comment.Text>

                <Comment.Actions>
                    <ReactionBar onReaction={ onReaction } style={{ marginTop: 10 }} reactions={ reactions || [] } />
                </Comment.Actions>
            </Comment.Content>

            {
                post.children ? <Thread posts={ post.children } collapsed={ collapsed } /> : null
            }
        </Comment>
    );
}

export default Response;