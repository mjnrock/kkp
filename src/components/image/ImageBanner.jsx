import React from "react";
import { Segment, Image } from "semantic-ui-react";

function ImageBanner(props) {
    return (
        <Segment inverted>
            <Image src={ `http://localhost:3001/img/${ props.name }` } width={ 900 } centered />
        </Segment>
    )
}

export default ImageBanner;