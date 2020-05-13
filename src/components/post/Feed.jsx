import React from "react";
import { Container, Header, Image, Segment } from "semantic-ui-react";

import CommentContainer from "../comment/CommentContainer";

const reactionPlaceholders = [
    { emoji: "❤️", qty: 14 },
    { emoji: "😀", qty: 9 },
    { emoji: "👍🏼", qty: 63 },
    { emoji: "🐾", qty: 54 },
];

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

function Feed(props) {
    const feedId = props.feedId;

    return (
        <Container style={{ marginTop: 30 }}>
            { feedId }
            <Header as="h2" color="orange" textAlign="center">
                <Header.Content>Kiszka at the Beach</Header.Content>
            </Header>
            
            <Segment inverted>
                <Image src="/assets/pusheen.png" centered />
            </Segment>
                        
            <CommentContainer posts={ posts } reactions={ reactionPlaceholders } />
        </Container>
    )
}

export default Feed;