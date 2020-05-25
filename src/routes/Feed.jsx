import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Segment } from "semantic-ui-react";

import Post from "./../components/post/Post";

function Feed(props) {
    const [ posts, setPosts ] = useState([]);
    const { handle: paramHandle } = useParams();
    const handle = props.handle || paramHandle;

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

                let postsData = data.sort((a, b) => a.PostCreatedDateTimeUTC < b.PostCreatedDateTimeUTC);

                setPosts(postsData);
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