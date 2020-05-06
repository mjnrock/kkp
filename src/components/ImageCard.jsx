import React from "react";
import { Image, Card } from "semantic-ui-react";

import ReactionBar from "./ReactionBar";

const reactionPlaceholders = [
    { icon: "heart", qty: 14 },
    { icon: "smile outline", qty: 9 },
    { icon: "paw", qty: 63 },
];

function ImageCard() {
    return (
        <Card
            header="Beachszka"
            meta="cat cute poofy"
        >
            <Image style={{ backgroundColor: "#333" }} src="./assets/pusheen.png" wrapped />

            <Card.Content>
                <Card.Header>
                    Beaszka
                </Card.Header>

                <Card.Description>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam doloremque velit, tempore magnam laborum facere modi pariatur ad. Tempora quia magni nihil. Doloribus repudiandae aspernatur sapiente a dolorem accusamus animi?
                </Card.Description>                    

                <Card.Meta style={{ marginTop: 10 }}>
                    {
                        [ "cat", "cute", "poofy" ].map(tag => (
                            <span key={ tag }>{ tag }</span>
                        ))
                    }
                </Card.Meta>
            </Card.Content>

            <Card.Content extra>
                <ReactionBar reactions={ reactionPlaceholders } />
            </Card.Content>
        </Card>
    )
}

export default ImageCard;