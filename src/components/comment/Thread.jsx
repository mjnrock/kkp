import React from "react";
import { Comment } from "semantic-ui-react";

import Response from "./Response";

function Thread(props) {
    return (
        <Comment.Group threaded collapsed={ props.collapsed }>
            {
                (props.posts || []).map(post => (
                    <Response key={ post.PostUUID } post={ post } />
                ))
            }
        </Comment.Group>
    )
}

export default Thread;