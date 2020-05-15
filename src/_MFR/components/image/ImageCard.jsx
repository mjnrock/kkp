import React from "react";
import { Image, Card } from "semantic-ui-react";

import ReactionBar from "./../comment/ReactionBar";

function ImageCard(props) {
    return (
        <Card>
            <Image style={{ backgroundColor: "#333" }} src="./assets/pusheen.png" wrapped />

            <Card.Content extra>
                <ReactionBar postId={ props.postId } reactions={ props.reactions } />
            </Card.Content>
        </Card>
    )
}

export default ImageCard;