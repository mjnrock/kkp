import React from "react";
import { Image } from "semantic-ui-react";

function FabricThumbnail(props) {
    const { obj } = props;
    const json = obj.toJSON();

    if(json.type === "text") {
        return <div>{ json.text }</div>
    }
    
    return <Image src={ json.src } />; 
}

export default FabricThumbnail;