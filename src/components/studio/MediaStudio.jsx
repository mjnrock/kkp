import React, { useState, useEffect, useContext } from "react";
import { Segment, Header, Sidebar, Menu, Icon } from "semantic-ui-react";

import { Context } from "./../../App";
import DrawToolbar from "./DrawToolbar";
import TextToolbar from "./TextToolbar";
import EmojiToolbar from "./EmojiToolbar";

function Toolbar(props) {
    const { tab, ...rest } = props || {};

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

function MediaStudio(props) {
    const canvasRef = React.createRef();
    const { uuid } = props;

    const { config } = useContext(Context);
    const [ post, setPost ] = useState({});
    const [ image, setImage ] = useState({});
    const [ tab, setTab ] = useState(0);

    useEffect(() => {
        if (uuid && !Object.keys(post).length) {
            config.api.Get(`post/${ uuid }`)
            .then(response => response.json())
            .then(data => {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");

                let img = new Image();
                img.onload = () => {
                    const ar = img.width / img.height;
                    let height = Math.min(img.height, 500);
                    let width = height * ar;

                    canvas.width = width;
                    canvas.height = height;

                    ctx.drawImage(img, 0, 0, width, height);
                    setImage(img);
                }
                img.src = config.api.Image(data.Filename);

                setPost(data);
            })
            .catch(e => setPost());
        }
        // eslint-disable-next-line
    }, [ uuid ]);

    return (
        <>
            <Header as="h2" color="orange" textAlign="center">
                <Header.Content>Customize Image</Header.Content>
            </Header>

            <Segment tertiary>                
                <Segment inverted textAlign="center">
                    <canvas ref={ canvasRef } className="studio-canvas"></canvas>
                </Segment>

                <div>
                    <Menu pointing color="orange" widths={ 3 }>
                        <Menu.Item
                            name="pencil"
                            active={ tab === 0 }
                            onClick={ e => setTab(0) }
                        >
                            <Icon name="pencil" size="large" />
                            <span style={{ marginLeft: 8 }}>Draw</span>
                        </Menu.Item>

                        <Menu.Item
                            name="font"
                            active={ tab === 1 }
                            onClick={ e => setTab(1) }
                        >
                            <Icon name="font" size="large" />
                            <span style={{ marginLeft: 8 }}>Text</span>
                        </Menu.Item>

                        <Menu.Item
                            name="smile outline"
                            active={ tab === 2 }
                            onClick={ e => setTab(2) }
                        >
                            <Icon name="smile outline" size="large" />
                            <span style={{ marginLeft: 8 }}>Emoji</span>
                        </Menu.Item>
                    </Menu>

                    <Segment basic>
                        <Toolbar tab={ tab } />
                    </Segment>
                </div>
            </Segment>
        </>
    );
}

export default MediaStudio;