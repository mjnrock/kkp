import React from "react";
import { useParams } from "react-router-dom";

import Post from "../components/post/package";

export default function Feed() {
    let { feedId } = useParams();

    return (
        <>
            <Post.Feed feedId={ feedId } />
        </>
    );
}