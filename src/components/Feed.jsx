import React, { useState } from "react";
import { Segment, Container, Header, Advertisement, Image } from "semantic-ui-react";

import Thread from "./Thread";
import Comment from "./Comment";


const posts = [
    {
        id: 1,
        message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos vel nesciunt nisi deserunt repudiandae officiis, expedita animi labore aut voluptas atque dolorem veritatis. Iusto earum architecto perspiciatis facilis magni quod."
    },
    {
        id: 2,
        message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos vel nesciunt nisi deserunt repudiandae officiis, expedita animi labore aut voluptas atque dolorem veritatis. Iusto earum architecto perspiciatis facilis magni quod.",
        children: [
            {
                id: 4,
                message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos vel nesciunt nisi deserunt repudiandae officiis, expedita animi labore aut voluptas atque dolorem veritatis. Iusto earum architecto perspiciatis facilis magni quod."
            },
            {
                id: 5,
                message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos vel nesciunt nisi deserunt repudiandae officiis, expedita animi labore aut voluptas atque dolorem veritatis. Iusto earum architecto perspiciatis facilis magni quod.",
                children: [
                    {
                        id: 6,
                        message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos vel nesciunt nisi deserunt repudiandae officiis, expedita animi labore aut voluptas atque dolorem veritatis. Iusto earum architecto perspiciatis facilis magni quod."
                    },
                    {
                        id: 7,
                        message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos vel nesciunt nisi deserunt repudiandae officiis, expedita animi labore aut voluptas atque dolorem veritatis. Iusto earum architecto perspiciatis facilis magni quod."
                    },
                ]
            },
        ]
    },
    {
        id: 3,
        message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos vel nesciunt nisi deserunt repudiandae officiis, expedita animi labore aut voluptas atque dolorem veritatis. Iusto earum architecto perspiciatis facilis magni quod.",
        children: [
            {
                id: 8,
                message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos vel nesciunt nisi deserunt repudiandae officiis, expedita animi labore aut voluptas atque dolorem veritatis. Iusto earum architecto perspiciatis facilis magni quod."
            },
            {
                id: 9,
                message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos vel nesciunt nisi deserunt repudiandae officiis, expedita animi labore aut voluptas atque dolorem veritatis. Iusto earum architecto perspiciatis facilis magni quod."
            },
        ]
    },
];

function Feed() {
    return (
        <Container style={{ marginTop: 30 }}>
            <Header as="h2" color="orange" textAlign="center">
                <Header.Content>Kiszka at the Beach</Header.Content>
            </Header>
            
            <Container style={{ backgroundColor: "rgba(0, 0, 0, 0.85)", border: "1px solid #000" }}>
                <Image src="./assets/pusheen.png" centered />
            </Container>
            
            <Comment
                onSubmitComment={ console.log }     //TODO Dispatch message to a "add comment" handler
                onEmojiSelect={ console.log }       //TODO Dispatch emoji to a "on user reaction" handler
                onImageSelect={ console.log }       //TODO Dispatch file to a "on image upload" handler
            />
            <Segment>
                <Thread posts={ posts } />
            </Segment>
        </Container>
    )
}

export default Feed;