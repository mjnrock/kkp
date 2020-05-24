import React from "react";
import { Segment, Image, Header, Divider } from "semantic-ui-react";

import ReactionBar from "./../comment/ReactionBar";
import InputComment from "./../comment/InputComment";
import Thread from "./../comment/Thread";
// import { Link } from "react-router-dom";

function Post(props) {
    const { post } = props;

    return (
        <Segment>
            <Header as="h2" color="orange" textAlign="center">
                <Header.Content>Post #{ post.PostUUID }</Header.Content>
            </Header>

            <Segment inverted>
                <Image src={ `http://192.168.86.100:3001/img/${ post.Filename }` } centered />
            </Segment>
            <ReactionBar onReaction={ console.log } reactions={ [] } />

            <Divider horizontal>Comments</Divider>
            
            <InputComment onSubmitComment={ console.log } />

            <Thread posts={ post.PostChildren }/>
        </Segment>
    );
}

export default Post;