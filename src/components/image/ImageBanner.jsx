import React, { useContext } from "react";
import { Segment, Image } from "semantic-ui-react";

import { Context } from "./../../App";

function ImageBanner(props) {
    const { config } = useContext(Context);
    return (
        <Segment inverted>
            <Image src={ config.api.Image(props.name) } width={ 900 } centered />
        </Segment>
    )
}

export default ImageBanner;