import React, { useState, useEffect, useContext } from "react";
import { Segment, Header, Menu, Icon } from "semantic-ui-react";
import { fabric as Fabric } from "fabric";

import { Context } from "./../../App";
// import Canvas from "./Canvas";
import DrawToolbar from "./DrawToolbar";
import TextToolbar from "./TextToolbar";
import EmojiToolbar from "./EmojiToolbar";
import Canvas from "./Canvas";
import FabricThumbnail from "./FabricThumbnail";

function MediaStudio(props) {
    const { uuid } = props;

    const { config, fabric } = useContext(Context);
    const [ post, setPost ] = useState({});
    const [ tab, setTab ] = useState(0);

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
            case 0:
                return <DrawToolbar { ...rest } />;
            case 1:
                return <TextToolbar { ...rest } />;
            case 2:
                return <EmojiToolbar { ...rest } />;
            default:
                return <DrawToolbar { ...rest } />;
        }
    }
    

    function MenuItem({ index, icon, label } = {}) {
        return (
            <Menu.Item
                name={ icon }
                active={ tab === index }
                onClick={ e => setTab(index) }
                className={ tab === index ? "orange-border-top" : null }
            >
                <Icon name={ icon } size="large" />
                <span style={{ marginLeft: 8 }}>{ label }</span>
            </Menu.Item>
        );
    }

    function onAction(module, action, value) {
        console.log(module, action, value);

        if(module === "text") {
            if(action === "insert") {
                var text = new Fabric.Text('hello world', { left: 100, top: 100 });
                fabric.add(text);
            }
        }
    }

    console.log(fabric._objects);
    console.log(fabric.toObject());

    fabric.getObjects().forEach(obj => {
        console.log(obj.toJSON())
    })

    return (
        <>
            <Header as="h2" color="orange" textAlign="center">
                <Header.Content>Customize Image</Header.Content>
            </Header>

            <Segment tertiary>                
                <Segment inverted textAlign="center">
                    <Canvas filename={ post.Filename } />
                </Segment>

                <Segment tertiary>
                    {
                        fabric.getObjects().map(obj => (
                            <div style={{ width: 300, maxWidth: 300, minWidth: 300, height: 150 }}>
                                <FabricThumbnail obj={ obj } />
                            </div>
                        ))
                    }
                </Segment>

                <div>
                    <Menu pointing color="orange" widths={ 3 }>
                        <MenuItem index={ 0 } icon="pencil" label="Draw" />
                        <MenuItem index={ 1 } icon="font" label="Text" />
                        <MenuItem index={ 2 } icon="smile outline" label="Emoji" />
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