import React, { useState } from "react";
import { Input, Button, Icon } from "semantic-ui-react";

import EmojiPicker from "./EmojiPicker";

function Comment(props) {
    const [ comment, setComment ] = useState();
    let imageRef = React.createRef();

    function onCommentKey(e) {
        if(e.which === 13) {
            props.onSubmitComment(comment);
        }
    }

    return (
        <div style={{
            marginTop: 20,
        }}>
            <div style={{
                marginBottom: 10
            }}>Post a Comment</div>

            <Input
                icon="comment outline"
                iconPosition="left"
                label={(
                    <Button basic icon onClick={ e => props.onSubmitComment(comment) }>
                        <Icon name="send orange" />
                    </Button>
                )}
                labelPosition="right"
                placeholder="Add a comment..."
                fluid
                onChange={ e => setComment(e.target.value) }
                onKeyUp={ onCommentKey }
            />

            <Button.Group style={{
                marginTop: 6,
            }}>
                { props.onEmojiSelect ? <EmojiPicker onSelect={ emoji => props.onEmojiSelect(emoji)} /> : null }

                { props.onImageSelect ? (
                    <Button basic icon onClick={ e => imageRef.current.click() }>
                        <Icon.Group>
                            <Icon name="camera" />
                            <Icon corner name="add" />
                        </Icon.Group>
                    </Button>
                ) : null }
            </Button.Group>

            <input ref={ imageRef } onChange={ e => props.onImageSelect(e.target.files[ 0 ]) } type="file" hidden />
        </div>
    )
}

export default Comment;