import React from "react";
import { Comment } from "semantic-ui-react";

import Response from "./Response";

function Thread(props) {
    if(!props.posts) {
        return null;
    }

    const posts = props.posts.sort((a, b) => a.PostCreatedDateTimeUTC < b.PostCreatedDateTimeUTC);

    return (
        <Comment.Group threaded collapsed={ props.collapsed }>
            {
                (posts || []).map(post => (
                    <Response key={ post.PostUUID } post={ post } />
                ))
            }
        </Comment.Group>
    )
}

export default Thread;