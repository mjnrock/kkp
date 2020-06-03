import React, { useState, useEffect, useContext } from "react";
import { Segment, Header, Menu, Icon, Button } from "semantic-ui-react";
import { fabric as Fabric } from "fabric";
import ColorConvert from "color-convert";

import { Context } from "./../../App";
import ImageToolbar from "./ImageToolbar";
import DrawToolbar from "./DrawToolbar";
import TextToolbar from "./TextToolbar";
import EmojiToolbar from "./EmojiToolbar";
import Canvas from "./Canvas";

import Popup from "./../Popup";
import EmojiPicker from "./../EmojiPicker";

function MediaStudio(props) {
    const { uuid } = props;

    const { config, fabric } = useContext(Context);
    const [ post, setPost ] = useState({});
    const [ finalImage, setFinalImage ] = useState();
    const [ isDrawMode, setIsDrawMode ] = useState(false);
    const [ tab, setTab ] = useState();

    function toolbarSelector(e) {
        const target = e.target;
    
        if(target) {
            const json = target.toJSON();

            // console.log(json.type)

            if(json.type === "text" || json.type === "i-text") {
                setTab("text");
            } else if(json.type === "image") {
                setTab("image");
            } else if(json.type === "path") {
                setTab("draw");
            }
        } else {
            setTab(null);
        }
    }
    useEffect(() => {
        fabric.on({
            "selection:created": toolbarSelector,
            "selection:updated": toolbarSelector,
            "selection:cleared": toolbarSelector,
        });

        return () => fabric.off({
            "selection:created": toolbarSelector,
            "selection:updated": toolbarSelector,
            "selection:cleared": toolbarSelector,
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(uuid && !Object.keys(post).length) {
            config.api.Get(`post/${ uuid }`)
            .then(response => response.json())
            .then(setPost)
            .catch(e => setPost());
        }
        // eslint-disable-next-line
    }, [ uuid ]);

    useEffect(() => {
        fabric.isDrawingMode = isDrawMode;
        
        if(isDrawMode) {
            setTab("draw");
        }
        // eslint-disable-next-line
    }, [ isDrawMode ]);

    function Toolbar({ tab, ...rest } = {}) {    
        switch(tab) {
            case "image":
                return <ImageToolbar { ...rest } />;
            case "draw":                
                return <DrawToolbar layer={ fabric.getActiveObject() } { ...rest } />;
            case "text":
                return <TextToolbar { ...rest } />;
            case "emoji":
                return <EmojiToolbar { ...rest } />;
            default:
                return null;
        }
    }

    function onAction(module, action, value) {
        // console.log(module, action, value);
        const layer = fabric.getActiveObject();

        if(module === "text") {
            if(action === "insert") {
                var text = new Fabric.IText(value || "Text!", { left: 100, top: 100 });
                fabric.add(text);
            } else if(layer && action === "style") {
                if(value === "bold") {
                    if(layer.fontWeight !== "bold") {
                        layer.set({ fontWeight: "bold" });
                    } else {
                        layer.set({ fontWeight: "normal" });
                    }
                } else if(value === "italic") {
                    if(layer.fontStyle !== "italic") {
                        layer.set({ fontStyle: "italic" });
                    } else {
                        layer.set({ fontStyle: "normal" });
                    }
                } else if(value === "underline") {
                    if(layer.underline !== true) {
                        layer.set({ underline: true});
                    } else {
                        layer.set({ underline: false });
                    }
                } else if(value === "strikethrough") {
                    if(layer.linethrough !== true) {
                        layer.set({ linethrough: true});
                    } else {
                        layer.set({ linethrough: false });
                    }
                }
            } else if(layer && action === "align") {
                layer.set({ textAlign: value });
            }
        } else if(module === "emoji") {
            if(action === "insert") {
                var text = new Fabric.IText(value || "Emoji!", { left: 100, top: 100 });
                fabric.add(text);
            }
        } else if(module === "draw") {
            if(action === "size") {
                fabric.freeDrawingBrush.width = value || 1;
                if(layer) {
                    layer.strokeWidth = value || 1;
                }
            } else if(action === "color") {
                const color = `#${ value }`;

                fabric.freeDrawingBrush.color = color;

                if(layer) {
                    layer.stroke = color;
                }
            }
        } else if(module === "delete") {
            fabric.remove(layer);
        }
        
        if(layer) {
            // console.log(layer)
            layer.dirty = true;
            fabric.renderAll();
        }
    }

    //* Deselect current object
    // fabric.discardActiveObject()

    return (
        <>
            <Header as="h2" color="orange" textAlign="center">
                <Header.Content>Customize Image</Header.Content>
            </Header>
            
            <Button onClick={ e => {
                const data = fabric.toDataURL({ format: "png" });
                alert("The image currently does not save, but will instead only show it client-side.  'Save' can be clicked multiple times.");

                setFinalImage(data);
                //TODO Send data file to the server for persistence (cf. UploadWizard, UploadImage for config.api.Form approach)
            }} fluid inverted color="blue">
                Save
            </Button>

            <Segment tertiary>
                <Segment inverted textAlign="center">
                    <Canvas filename={ post.Filename } />
                    <img src={ finalImage } style={{ border: "1px solid #fff" }} />
                </Segment>

                <div>
                    <Button.Group fluid>
                        <Button onClick={ e => onAction("text", "insert") } basic>
                            <Icon name="font" size="large" />
                            <span style={{ marginLeft: 6 }}>Text</span>
                        </Button>
                                
                        <EmojiPicker onSelectExtended={ emoji => {
                            setIsDrawMode(false);
                            onAction("emoji", "insert", emoji.native);
                        }} trigger={
                            <Button basic>
                                <Icon name="smile outline" size="large" />
                                <span style={{ marginLeft: 6 }}>Emoji</span>
                            </Button>
                        }/>

                        <Button onClick={ e => setIsDrawMode(!isDrawMode) } color={ isDrawMode ? "orange" : null }>
                            <Icon name="pencil" size="large" />
                            <span style={{ marginLeft: 6 }}>Draw</span>
                        </Button>

                        {
                            tab ? (
                                <Button onClick={ e => onAction("delete") } color="red">
                                    <Icon name="trash" size="large" />
                                    <span style={{ marginLeft: 6 }}>Delete</span>
                                </Button>
                            ) : null
                        }
                    </Button.Group>

                    <Segment basic>
                        <Toolbar tab={ tab } onAction={ onAction } />
                    </Segment>
                </div>
            </Segment>
        </>
    );
}

export default MediaStudio;