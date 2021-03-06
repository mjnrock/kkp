import React, { useState } from "react";
import { Step, Icon, Segment } from "semantic-ui-react";

import { Context } from "./../../App";
import CaptureImage from "./CaptureImage";
import UploadImage from "./UploadImage";
import CustomizeImage from "./CustomizeImage";
import { useContext } from "react";

function UploadWizard() {
    const { state, config } = useContext(Context);
    const [ response, setResponse ] = useState({});
    const [ image, setImage ] = useState();
    const [ step, setStep ] = useState(0);

    function onImageCapture(image) {
        setImage(image);
        setStep(1);
    }

    function resetWizard() {
        setImage();
        setStep(0);
    }

    function onUpload() {
        //TODO Convert image into base64 PNG or GIF only
        config.api.Form("image/upload", {
            photo: image
        }, {
            entity: state.user.Handle
        })
        .then(response => response.json())
        .then(data => {
            if(data.PostUUID) {
                setResponse(data);
                setStep(2);
            } else {
                // Image Upload Failed
                resetWizard();
            }
        })
        .catch(e => {
            // Image Upload Failed
        });
    }

    function SwitchPage() {
        switch(step) {
            case 0:
                return <CaptureImage onSelect={ onImageCapture } />;
            case 1:
                return <UploadImage image={ image } onReturn={ resetWizard } onUpload={ onUpload } />;
            case 2:
                return <CustomizeImage image={ image } data={ response } />;
            default:
                return <CaptureImage onSelect={ onImageCapture } />;
        }
    }

    return (
        <>
            <Step.Group attached="top">
                <Step active={ step === 0 } disabled={ step !== 0 ? true : false }>
                    {
                        step > 0 ? (
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

                <Step active={ step === 1 } disabled={ step !== 1 ? true : false }>
                    {
                        step > 1 ? (
                            <Icon name="check" color="green"/>
                        ) : (
                            <Icon name="upload" />
                        )
                    }
                    <Step.Content>
                        <Step.Title>Upload</Step.Title>
                        <Step.Description>Post your image</Step.Description>
                    </Step.Content>
                </Step>

                <Step active={ step === 2 } disabled={ step !== 2 ? true : false }>
                    {
                        step > 2 ? (
                            <Icon name="check" color="green"/>
                        ) : (
                            <Icon name="paint brush" />
                        )
                    }
                    <Step.Content>
                        <Step.Title>Customize</Step.Title>
                        <Step.Description>Edit your image</Step.Description>
                    </Step.Content>
                </Step>
            </Step.Group>

            <Segment attached>
                <SwitchPage />
            </Segment>
        </>
    );
}

export default UploadWizard;