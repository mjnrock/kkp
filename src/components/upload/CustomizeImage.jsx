import React from "react";
import { Image, Button, Icon, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

function CustomizeImage(props) {
    const { data } = props;

    return (
        <Segment basic >
            <Segment inverted>
                <Image src={ URL.createObjectURL(props.image) } centered />
            </Segment>

            <Button.Group fluid style={{ marginTop: 20 }}>
                <Button icon inverted color="orange" size="large" as={ Link } to={ `/post/${ data.id }` }>
                    View Post
                </Button>
            </Button.Group>
        </Segment>
    );
}

export default CustomizeImage;