import React, { useState, useEffect, useContext } from "react";
import { Segment, Header, Menu, Icon } from "semantic-ui-react";
import { fabric as Fabric } from "fabric";

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
    const [ isDrawMode, setIsDrawMode ] = useState(false);
    const [ tab, setTab ] = useState();

    function toolbarSelector(e) {
        if(isDrawMode) {
            setTab("draw");
        } else {
            const target = e.target;
    
            if(target) {
                const json = target.toJSON();
    
                console.log(json.type)
    
                if(json.type === "text" || json.type === "i-text") {
                    setTab("text");
                } else if(json.type === "image") {
                    setTab("image");
                }
            } else {
                setTab(null);
            }
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

    function Toolbar({ tab, ...rest } = {}) {    
        switch(tab) {
            case "image":
                return <ImageToolbar { ...rest } />;
            case "draw":
                return <DrawToolbar { ...rest } />;
            case "text":
                return <TextToolbar { ...rest } />;
            case "emoji":
                return <EmojiToolbar { ...rest } />;
            default:
                return null;
        }
    }
    

    function MenuItem({ command, icon, label } = {}) {
        if(command === "text") {
            return (
                <Menu.Item
                    name={ icon }
                    onClick={ e => {
                        setIsDrawMode(false);
    
                        onAction(command, "insert");
                    }}
                >
                    <Icon name={ icon } size="large" />
                    <span style={{ marginLeft: 8 }}>{ label }</span>
                </Menu.Item>
            );
        } else if(command === "emoji") {
            return (
                <EmojiPicker onSelectExtended={ emoji => {
                    setIsDrawMode(false);

                    onAction(command, "insert", emoji.native);
                }} trigger={
                    <Menu.Item
                        name={ icon }
                    >
                        <Icon name={ icon } size="large" />
                        <span style={{ marginLeft: 8 }}>{ label }</span>
                    </Menu.Item>
                }/>
            );
        } else if(command === "draw") {
            return (
                <Menu.Item
                    name={ icon }
                    active={ isDrawMode }
                    onClick={ e => setIsDrawMode(!isDrawMode) }
                    className={ isDrawMode ? "orange-border-top" : null }
                >
                    <Icon name={ icon } size="large" />
                    <span style={{ marginLeft: 8 }}>{ label }</span>
                </Menu.Item>
            );
        }
    }

    function onAction(module, action, value) {
        console.log(module, action, value);
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
        }
        
        if(layer) {
            layer.dirty = true;
            fabric.renderAll();
        }
    }

    return (
        <>
            <Header as="h2" color="orange" textAlign="center">
                <Header.Content>Customize Image</Header.Content>
            </Header>

            <Segment tertiary>
                <Segment inverted textAlign="center">
                    <Canvas filename={ post.Filename } />
                </Segment>

                <div>
                    <Menu color="orange" widths={ 3 }>
                        <MenuItem command="draw" icon="pencil" label="Draw" />
                        <MenuItem command="text" icon="font" label="Text" />
                        <MenuItem command="emoji" icon="smile outline" label="Emoji" />
                    </Menu>

                    <Segment basic>
                        <Toolbar tab={ tab } onAction={ onAction } />
                    </Segment>
                </div>
            </Segment>
        </>
    );
}

export default MediaStudio;