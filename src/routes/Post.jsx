import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../App";
import { Segment } from "semantic-ui-react";
import Thread from "../components/comment/Thread";

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
                <div>Post #{ postId }</div>
                <Thread posts={ posts }/>
            </Segment>
        );
    }

    return (
        <div>Loading...</div>
    )
}

export default Post;