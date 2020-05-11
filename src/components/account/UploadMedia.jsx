import React, { useState } from "react";
import { Step, Header, Icon, Segment, Button, Grid, Divider, Image, Container } from "semantic-ui-react";

function UploadMedia() {
    return (
        <>
            <Header as="h2" color="orange" textAlign="center">
                <Header.Content>Upload Media</Header.Content>
            </Header>

            <Step.Group attached="top">
                <Step active onClick={ console.log }>
                    {/* <Step disabled onClick={ console.log }> */ }
                    <Icon name="camera retro" />
                    <Step.Content>
                        <Step.Title>Capture</Step.Title>
                        <Step.Description>Take or upload an image</Step.Description>
                    </Step.Content>
                </Step>

                <Step active onClick={ console.log }>
                    {/* <Step disabled onClick={ console.log }> */ }
                    <Icon name="pencil" />
                    <Step.Content>
                        <Step.Title>Draw</Step.Title>
                        <Step.Description>Customize your image</Step.Description>
                    </Step.Content>
                </Step>

                <Step active onClick={ console.log }>
                    {/* <Step disabled onClick={ console.log }> */ }
                    <Icon name="upload" />
                    <Step.Content>
                        <Step.Title>Upload</Step.Title>
                        <Step.Description>Post your image</Step.Description>
                    </Step.Content>
                </Step>
            </Step.Group>

            <Segment attached>
                <CaptureMedia />
            </Segment>
        </>
    );
}

function CaptureMedia() {
    const imageRef = React.createRef();
    const photoRef = React.createRef();
    const fileRef = React.createRef();
    const [ photo, setPhoto ] = useState();
    const [ file, setFile ] = useState();

    function onPhoto(e) {
        photoRef.current.click();
    }
    function onFile(e) {
        fileRef.current.click();
    }

    let source = photo || file ? URL.createObjectURL(photo || file) : null;

    if(!source) {
        return (
            <Segment placeholder>
                <Grid columns={ 2 } stackable textAlign="center">
                    <Divider vertical>Or</Divider>

                    <Grid.Row verticalAlign="middle">
                        <Grid.Column>
                            <Button icon labelPosition="left" color="blue" size="large" onClick={ onPhoto }>
                                <Icon name="camera retro" />
                                Take Photo
                            </Button>
                        </Grid.Column>

                        <Grid.Column>
                            <Button icon labelPosition="left" color="blue" size="large" onClick={ onFile }>
                                <Icon name="file images outline" />
                                Upload Image
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <input ref={ photoRef } type="file" accept="image/*;capture=camera" hidden onChange={ e => setPhoto(e.target.files[ 0 ]) } />
                <input ref={ fileRef } type="file" accept="image/*;" hidden onChange={ e => setFile(e.target.files[ 0 ]) } />
            </Segment>
        );
    }

    return (
        <Segment basic>
            <Container style={{ backgroundColor: "rgba(0, 0, 0, 0.85)", marginBottom: 10 }}>
                <Image src={ source } centered/>
            </Container>

            <Button.Group basic attached="bottom">                
                <Button icon onClick={ onPhoto }>
                    <Icon name="camera retro" />
                </Button>
                
                <Button icon onClick={ onFile }>
                    <Icon name="file images outline" />
                </Button>
            </Button.Group>
                
            <Button.Group fluid style={{ marginTop: 20 }}>   
                <Button icon labelPosition="right" color="blue" size="large">
                    <Icon name="long arrow alternate right" />
                    Continue
                </Button>
            </Button.Group>

            <input ref={ photoRef } type="file" accept="image/*;capture=camera" hidden onChange={ e => setPhoto(e.target.files[ 0 ]) } />
            <input ref={ fileRef } type="file" accept="image/*;" hidden onChange={ e => setFile(e.target.files[ 0 ]) } />
        </Segment>
    );
}

export default UploadMedia;