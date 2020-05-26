import React, { useState, useContext } from "react";
import { Comment, Icon } from "semantic-ui-react";

import { Context } from "./../../App";
import Thread from "./Thread";
import ReactionBar from "./ReactionBar";

function Response(props) {
    const { post } = props;

    const { state, config } = useContext(Context);
    const [ collapsed, setCollapsed ] = useState(false);
    const [ reactions, setReactions ] = useState(post.PostReactions || []);

    function onReaction(emoji) {        
        config.api.Post("react", {
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

    return (
        <Comment>
            <Comment.Avatar as="a" src={ `http://192.168.86.100:3001/img/${ post.EntityHandle }.jpg` } />
            <Comment.Content>
                <Comment.Author as="a">{ post.EntityHandle }</Comment.Author>

                <Comment.Metadata>
                    <span>{ post.PostCreatedDateTimeUTC }</span>
                </Comment.Metadata>
                
                {
                    post.PostChildren ? (
                        <Icon style={{ cursor: "pointer" }} size="large" name={ collapsed ? "angle up orange" : "angle down grey" } onClick={ e => setCollapsed(!collapsed) } />
                    ) : null
                }
                
                <Comment.Text>{ post.PostContent }</Comment.Text>

                <Comment.Actions>
                    <ReactionBar onReaction={ onReaction } style={{ marginTop: 10 }} reactions={ reactions || [] } />
                </Comment.Actions>
            </Comment.Content>

            {
                post.PostChildren ? <Thread posts={ post.PostChildren } collapsed={ collapsed } /> : null
            }
        </Comment>
    );
}

export default Response;