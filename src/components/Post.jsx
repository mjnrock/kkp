import React from "react";
import { Comment } from "semantic-ui-react";

import Thread from "./Thread";
import ReactionBar from "./ReactionBar";

const reactionPlaceholders = [
    { icon: "heart", qty: 14 },
    { icon: "smile outline", qty: 9 },
    { icon: "paw", qty: 63 },
];

function Post(props) {
    return (        
        <Comment>
            <Comment.Avatar as="a" src="./assets/pusheen.png" />
            <Comment.Content>
                <Comment.Author as="a">Matt</Comment.Author>
                
                <Comment.Metadata>
                    <span>Today at 5:42PM</span>
                </Comment.Metadata>

                <Comment.Text>{ props.message }</Comment.Text>

                <Comment.Actions>
                    <ReactionBar style={{ marginTop: 10 }} reactions={ reactionPlaceholders } />
                </Comment.Actions>
            </Comment.Content>

            {
                props.children ? <Thread posts={ props.children } /> : null
            }
        </Comment>
    );
    // return (
    //     <List.Item style={{ marginTop: 14, paddingTop: 20 }}>
    //         <List.Icon name="github" size="large" verticalAlign="middle" />
    //         <List.Content>
    //             <List.Header as="h4" className="orange">Bob McRobertson</List.Header>
    //             {
    //                 props.children
    //             }
    //             <List.Description style={{
    //                 marginTop: 8
    //             }}>Posted on Tuesday, May 5th at 19:46:36</List.Description>
    //         </List.Content>

    //         <Label.Group size="large" style={{ marginTop: 14 }}>
    //             {
    //                 reactionPlaceholders.map(rp => (
    //                     <Reaction icon={ rp.icon } qty={ rp.qty } />
    //                 ))
    //             }

    //             <Label as="a" basic color="blue" style={{ marginLeft: 20 }}>
    //                 <Icon.Group>
    //                     <Icon name="smile outline" />
    //                     <Icon corner name="add" />
    //                 </Icon.Group>
    //             </Label>
    //         </Label.Group>
    //     </List.Item>
    // )
}

export default Post;