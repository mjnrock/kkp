import React from "react";
import { useParams } from "react-router-dom";

import Components from "./../components/package";

export default function Feed() {
    let { feedId } = useParams();

    return (
        <>
            <Components.Feed feedId={ feedId } />
        </>
    );
}