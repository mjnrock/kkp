import React, { useState } from "react";
import { Step, Header, Icon, Segment, Button, Grid, Divider, Image, Popup } from "semantic-ui-react";
import ColorPicker from "./../comment/ColorPicker";

function Page(props) {
    if(props.page === "capture") {
        return <CaptureMedia image={ props.image } onContinue={ props.onContinue } />;
    } else if(props.page === "draw") {
        return <DrawMedia image={ props.image } onContinue={ props.onContinue } />;
    } else if(props.page === "upload") {
        return <UploadMedia onContinue={ props.onContinue } />;
    }

    return null;
}

function UploadMedia() {
    const [ page, setPage ] = useState("capture");
    const [ image, setImage ] = useState();

    function onContinue(page, img) {
        if(page) {
            setPage(page);
        }

        if(img) {
            setImage(img);
        }
    }

    return (
        <>
            <Step.Group attached="top">
                <Step active={ page === "capture" } disabled={ image ? true : false } onClick={ e => setPage("capture") }>
                    {
                        image ? (
                            <Icon name="check" color="green"/>
                        ) : (
                            <Icon name="camera retro" />
                        )
                    }
                    <Step.Content>
                        <Step.Title>Capture</Step.Title>
                        <Step.Description>Take or upload an image</Step.Description>
                    </Step.Content>
                </Step>

                <Step active={ page === "draw" } disabled={ image ? false : true } onClick={ e => setPage("draw") }>
                    <Icon name="pencil" />
                    <Step.Content>
                        <Step.Title>Draw</Step.Title>
                        <Step.Description>Customize your image</Step.Description>
                    </Step.Content>
                </Step>

                <Step active={ page === "upload" } disabled={ image ? false : true } >
                    <Icon name="upload" />
                    <Step.Content>
                        <Step.Title>Upload</Step.Title>
                        <Step.Description>Post your image</Step.Description>
                    </Step.Content>
                </Step>
            </Step.Group>

            <Segment attached>
                <Page image={ image } page={ page } onContinue={ onContinue } />
            </Segment>
        </>
    );
}

function CaptureMedia(props) {
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

    if(photo || file || props.image) {
        props.onContinue("draw", photo || file || props.image);
    }

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
                            Choose Image
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <input ref={ photoRef } type="file" accept="image/*;capture=camera" hidden onChange={ e => setPhoto(e.target.files[ 0 ]) } />
            <input ref={ fileRef } type="file" accept="image/*;" hidden onChange={ e => setFile(e.target.files[ 0 ]) } />
        </Segment>
    );
}

function DrawMedia(props) {
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

    let source = props.image || photo || file ? URL.createObjectURL(photo || file || props.image) : null;

    return (
        <Segment basic >
            <Segment inverted>
                <Image src={ source } centered />
            </Segment>
                
            <Button.Group>
                <Button icon>
                    <Icon name="align left" />
                </Button>
                <Button icon>
                    <Icon name="align center" />
                </Button>
                <Button icon>
                    <Icon name="align right" />
                </Button>
                <Button icon>
                    <Icon name="align justify" />
                </Button>
            </Button.Group>
            {" "}
            <Button.Group>
                <Button icon>
                    <Icon name="bold" />
                </Button>
                <Button icon>
                    <Icon name="underline" />
                </Button>
                <Button icon>
                    <Icon name="text width" />
                </Button>
            </Button.Group>
            {" "}
            <Button.Group>
                <Button icon>
                    <Icon name="paint brush" />
                </Button>
                <Popup
                    style={{
                        padding: 2,
                        borderRadius: 5,
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                        ...(props.style || {})
                    }}
                    className="popup-container"
                    content={(
                        <Segment>
                            <ColorPicker onHex={ console.log } hue={ 250 } favorites={ [ "#000", "#FFF", "#21BA45", "#A333C8", "#2185D0" ] } />
                        </Segment>
                    )}
                    on="click"
                    pinned
                    trigger={(
                        <Button icon>
                            <Icon name="tint" />
                        </Button>
                    )}
                />
            </Button.Group>
            {" "}
            <Button.Group>
                <Button icon>
                    <Icon name="smile outline" />
                </Button>
            </Button.Group>

            <Button.Group fluid style={{ marginTop: 20 }}>
                <Button.Group basic size="huge">
                    <Button icon onClick={ onPhoto }>
                        <Icon.Group>
                            <Icon name="camera retro" />
                            <Icon corner="bottom right" name="add" />
                        </Icon.Group>
                    </Button>
                    
                    <Button icon onClick={ onFile }>
                        <Icon.Group>
                            <Icon name="file images outline" />
                            <Icon corner="bottom right" name="add" />
                        </Icon.Group>
                    </Button>
                </Button.Group>

                <Button icon labelPosition="left" color="blue" size="large" onClick={ e => props.onContinue("draw", photo || file || props.image) }>
                    <Icon name="upload" />
                    Upload
                </Button>
            </Button.Group>

            <input ref={ photoRef } type="file" accept="image/*;capture=camera" hidden onChange={ e => setPhoto(e.target.files[ 0 ]) } />
            <input ref={ fileRef } type="file" accept="image/*;" hidden onChange={ e => setFile(e.target.files[ 0 ]) } />
        </Segment>
    );
}

export default UploadMedia;