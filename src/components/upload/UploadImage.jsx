import React from "react";
import { Image, Button, Icon, Segment } from "semantic-ui-react";

function UploadImage(props) {
    return (
        <Segment basic >
            <Segment inverted>
                <Image src={ URL.createObjectURL(props.image) } centered />
            </Segment>

            <Button.Group fluid style={{ marginTop: 20 }}>
                <Button.Group basic size="large">                    
                    <Button icon onClick={ props.onReturn }>
                        <Icon name="arrow left"/>
                        <span style={{ paddingLeft: 10 }}>Back</span>
                    </Button>
                </Button.Group>

                <Button icon labelPosition="left" color="blue" size="large" onClick={ props.onUpload }>
                    <Icon name="upload" />
                    Upload
                </Button>
            </Button.Group>
        </Segment>
    );
}

export default UploadImage;