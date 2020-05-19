import React, { useState, useEffect } from "react";
import { Divider, Grid, Button, Icon, Segment } from "semantic-ui-react";

function CaptureImage(props) {
    const photoRef = React.createRef();
    const fileRef = React.createRef();
    const [ photo, setPhoto ] = useState();

    useEffect(() => {
        if(photo) {
            props.onSelect(photo);
        }
        // eslint-disable-next-line
    }, [ photo ]);

    function selectPhoto(e) {
        let file = e.target.files[ 0 ];

        if(file) {
            setPhoto(file);
        }
    }

    return (
        <Segment placeholder>
            <Grid columns={ 2 } stackable textAlign="center">
                <Divider vertical>Or</Divider>

                <Grid.Row verticalAlign="middle">
                    <Grid.Column>
                        <Button icon labelPosition="left" color="blue" size="large" onClick={ e => photoRef.current.click() }>
                            <Icon name="camera retro" />
                            Take Photo
                        </Button>
                    </Grid.Column>

                    <Grid.Column>
                        <Button icon labelPosition="left" color="blue" size="large" onClick={ e => fileRef.current.click() }>
                            <Icon name="file images outline" />
                            Choose Image
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <input ref={ photoRef } type="file" accept="image/*;capture=camera" hidden onChange={ selectPhoto } />
            <input ref={ fileRef } type="file" accept="image/*" hidden onChange={ selectPhoto } />
        </Segment>
    );
}

export default CaptureImage;