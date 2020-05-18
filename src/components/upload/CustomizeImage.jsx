import React from "react";
import { Image, Button, Icon, Segment } from "semantic-ui-react";

function CustomizeImage(props) {
    return (
        <Segment basic >
            <Segment inverted>
                <Image src={ URL.createObjectURL(props.image) } centered />
            </Segment>

            <div>Do stuff here...</div>

            <Button.Group fluid style={{ marginTop: 20 }}>
                <Button icon inverted color="orange" size="large" onClick={ props.onUpload }>
                    View Post
                </Button>
            </Button.Group>
        </Segment>
    );
}

export default CustomizeImage;