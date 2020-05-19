import React from "react";
import { Segment, Image, Header } from "semantic-ui-react";

import ReactionBar from "./../comment/ReactionBar";
import InputComment from "./../comment/InputComment";
import Thread from "./../comment/Thread";
import { Link } from "react-router-dom";

function Post(props) {
    const { post } = props;

    return (
        <Segment>
            <Header as="h2" color="orange" textAlign="center">
                <Link to={ `/post/${ post.id }` }>{ post.id }</Link>
            </Header>

            <Segment inverted>
                <Image src={ `http://192.168.86.100:3001/img/${ post.image }` } centered />
            </Segment>

            <ReactionBar onReaction={ console.log } reactions={ [] } />
            <InputComment onSubmitComment={ console.log } />

            <Thread posts={ post.children } />
        </Segment>
    );
}

export default Post;