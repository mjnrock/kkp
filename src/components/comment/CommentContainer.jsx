import React from "react";
import { Segment } from "semantic-ui-react";

import Thread from "../comment/Thread";
import InputComment from "../comment/InputComment";
import ReactionBar from "../comment/ReactionBar";

function CommentContainer(props) {
    return (
        <div>
            <ReactionBar style={{ marginTop: 20 }} showPicker={ false } reactions={ props.reactions } />

            <InputComment
                onSubmitComment={ console.log }     //TODO Dispatch message to a "add comment" handler
                onEmojiSelect={ console.log }       //TODO Dispatch emoji to a "on user reaction" handler
                onImageSelect={ console.log }       //TODO Dispatch file to a "on image upload" handler
            />
            <Segment>
                <Thread posts={ props.posts } />
            </Segment>
        </div>
    )
}

export default CommentContainer;