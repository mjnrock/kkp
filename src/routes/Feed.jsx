import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Segment } from "semantic-ui-react";

import Post from "./../components/post/Post";

function Feed() {
    const [ posts, setPosts ] = useState([]);
    const { handle } = useParams();

    useEffect(() => {
        if(handle) {
            fetch(`http://192.168.86.100:3001/feed/${ handle }`)
            .then(response => response.json())
            .then(data => {
                for(let i in data) {
                    if(typeof data[ i ].PostChildren === "string") {
                        data[ i ].PostChildren = JSON.parse(data[ i ].PostChildren);
                    }
                    if(typeof data[ i ].PostReactions === "string") {
                        data[ i ].PostReactions = JSON.parse(data[ i ].PostReactions);
                    }
                }

                setPosts(data);
            });
        }
    }, [ handle ]);

    if(!posts.length) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <Segment secondary>
            {
                posts.map(post => (
                    <Post key={ post.PostUUID } post={ post } />
                ))
            }
        </Segment>
    );
}

export default Feed;