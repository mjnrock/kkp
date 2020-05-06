import React from "react";
import { Input, Button, Icon } from "semantic-ui-react";

function Comment(props) {
    let imageRef = React.createRef();

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
                label={ <Button basic icon><Icon name="send orange" /></Button> }
                labelPosition="right"
                placeholder="Add a comment..."
                fluid
            />

            <Button.Group style={{
                marginTop: 6,
            }}>
                <Button basic icon>
                    <Icon.Group>
                        <Icon name="smile outline" />
                        <Icon corner name="add" />
                    </Icon.Group>
                </Button>

                <Button basic icon onClick={ e => imageRef.current.click() }>
                    <Icon.Group>
                        <Icon name="camera" />
                        <Icon corner name="add" />
                    </Icon.Group>
                </Button>
            </Button.Group>

            <input ref={ imageRef } type="file" hidden />
        </div>
    )
}

export default Comment;