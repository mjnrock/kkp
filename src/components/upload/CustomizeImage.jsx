import React from "react";
import { Image, Button, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

function CustomizeImage(props) {
    const { data } = props;

    return (
        <Segment basic >
            <Segment inverted>
                <Image src={ `http://localhost:3001/img/${ data.Filename }` } centered />
            </Segment>

            <Button.Group fluid style={{ marginTop: 20 }}>
                <Button icon inverted color="orange" size="large" as={ Link } to={ `/post/${ data.PostUUID }` }>
                    View Post
                </Button>
            </Button.Group>
        </Segment>
    );
}

export default CustomizeImage;