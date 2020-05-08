import React from "react";
import { Image } from "semantic-ui-react";

function Album(props) {
    return (
        <Image.Group>
            { props.children }
        </Image.Group>
    )
}

export default Album;