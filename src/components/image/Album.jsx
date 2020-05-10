import React from "react";
import { Container, Header, Grid, Divider, Segment } from "semantic-ui-react";

import Image from "./Image";
import ReactionBar from "./../post/ReactionBar";
import Comment from "./../post/Comment";
import Thread from "./../post/Thread";

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

function Album(props) {
    const images = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0 ];

    return (
        <Container style={{ marginTop: 30 }}>
            <Header as="h2" color="orange" textAlign="center">
                <Header.Content>
                    Kiszka at the Beach                    
                    <Header as="h4" color="grey" textAlign="center">
                        <Header.Content>A Journey to Kiszka and Back</Header.Content>
                    </Header>
                </Header.Content>
            </Header>

            <Divider horizontal>Images</Divider>
            
            <Grid relaxed columns={ 4 }>
                {
                    images.map(image => (
                        <Grid.Column key={ image }>
                            <Image />
                        </Grid.Column>
                    ))
                }
            </Grid>
            <ReactionBar style={{ marginTop: 20 }} showPicker={ false } reactions={ reactionPlaceholders } />
            
            <Comment
                style={{ marginTop: 40 }}
                onSubmitComment={ console.log }     //TODO Dispatch message to a "add comment" handler
                onEmojiSelect={ console.log }       //TODO Dispatch emoji to a "on user reaction" handler
                onImageSelect={ console.log }       //TODO Dispatch file to a "on image upload" handler
            />
            <Segment>
                <Thread posts={ posts } />
            </Segment>
        </Container>
    );
}

export default Album;