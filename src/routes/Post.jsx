import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PostComponent from "./../components/post/Post";

function Post() {
    const { uuid } = useParams();
    const [ post, setPost ] = useState({});

    useEffect(() => {
        if(!Object.keys(post).length) {
            fetch(`http://192.168.86.100:3001/post/${ uuid }`)
            .then(response => response.json())
            .then(setPost);
        }
        // eslint-disable-next-line
    }, []);

    console.log(post);

    if(!Object.keys(post).length) {
        return (
            <div>Loading...</div>
        );
    }
    
    return (
        <PostComponent post={ post } />
    );
}

export default Post;