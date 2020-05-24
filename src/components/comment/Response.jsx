import React, { useState, useContext } from "react";
import { Comment, Icon } from "semantic-ui-react";

import { Context } from "./../../App";
import Thread from "./Thread";
import ReactionBar from "./ReactionBar";

function Response(props) {
    const { post } = props;

    const { state } = useContext(Context);
    const [ collapsed, setCollapsed ] = useState(false);
    const [ reactions, setReactions ] = useState(post.PostReactions || []);

    
    function onReaction(emoji) {
        // dispatch({
        //     type: "REACTION",
        //     data: {
        //         emoji,
        //         postId: props.postId
        //     }
        // });

        // const myHeaders = new Headers();

        // const myRequest = new Request('flowers.jpg', {
        // method: 'GET',
        // headers: { "X-Auth", "token" },  // Pass custom authentication header here
        // mode: 'cors',
        // cache: 'default',
        // });

        // fetch(myRequest)
        // .then(response => response.blob())
        // .then(myBlob => {
        //     myImage.src = URL.createObjectURL(myBlob);
        // });
    }

    return (
        <Comment>
            <Comment.Avatar as="a" src="/assets/pusheen.png" />
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