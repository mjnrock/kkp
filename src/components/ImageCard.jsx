import React from "react";
import { Image, Card } from "semantic-ui-react";

import ReactionBar from "./ReactionBar";

const reactionPlaceholders = [
    { emoji: "❤️", qty: 14 },
    { emoji: "😀", qty: 9 },
    { emoji: "👍🏼", qty: 63 },
    { emoji: "🐾", qty: 54 },
];

function ImageCard(props) {
    // const header = props.header ?
    //     (
    //         <Card.Header>
    //             { props.header }
    //         </Card.Header>
    //     )
    //     : null;
        
    // const description = 
    //     props.description ?
    //     (
    //         <Card.Description>
    //             { props.description }
    //         </Card.Description>
    //     )
    //     : null;
    
    // const tags = 
    //     props.tags ?
    //     (
    //         <Card.Meta style={{ marginTop: 10 }}>
    //             {
    //                 props.tags.map(tag => (
    //                     <span key={ tag }>{ tag }</span>
    //                 ))
    //             }
    //         </Card.Meta>
    //     )
    //     : null;

    return (
        <Card>
            <Image style={{ backgroundColor: "#333" }} src="./assets/pusheen.png" wrapped />

            {/* {
                (header || description || tags) ? (
                    <Card.Content>
                        { header }                   
                        { description }                   
                        { tags }
                    </Card.Content>
                ) : null
            } */}

            <Card.Content extra>
                <ReactionBar reactions={ reactionPlaceholders } />
            </Card.Content>
        </Card>
    )
}

export default ImageCard;