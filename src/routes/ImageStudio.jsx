import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Segment, Header, Sidebar, Menu, Icon } from "semantic-ui-react";

function ImageStudio(props) {
    const canvasRef = React.createRef();
    const { uuid } = useParams();
    const [ post, setPost ] = useState({});
    const [ image, setImage ] = useState({});

    useEffect(() => {
        if (!Object.keys(post).length) {
            fetch(`http://192.168.86.100:3001/post/${uuid}`)
                .then(response => response.json())
                .then(data => {
                    const canvas = canvasRef.current;
                    const ctx = canvas.getContext("2d");

                    let img = new Image();
                    img.onload = () => {
                        canvas.width = img.width;
                        canvas.height = img.height;

                        ctx.drawImage(img, 0, 0);
                        setImage(img);
                    }
                    img.src = `http://192.168.86.100:3001/img/${data.Filename}`;

                    setPost(data);
                })
                .catch(e => setPost());
        }
        // eslint-disable-next-line
    }, [ uuid ]);

    return (
        <Segment secondary>
            <Header as="h2" color="orange" textAlign="center">
                <Header.Content>Customize Image</Header.Content>
            </Header>

            <Sidebar.Pushable as={ Segment }>
                <Sidebar
                    as={ Menu }
                    animation="overlay"
                    direction="left"
                    icon="labeled"
                    vertical
                    visible
                    width="thin"
                >
                    <Menu.Item onClick={ console.log } active>
                        <Icon name="pencil" />
                        Draw
                    </Menu.Item>
                    <Menu.Item onClick={ console.log }>
                        <Icon name="font" />
                        Text
                    </Menu.Item>
                    <Menu.Item onClick={ console.log }>
                        <Icon name="smile outline" />
                        Emoji
                    </Menu.Item>
                    <Menu.Item onClick={ console.log }>
                        <Icon name="image outline" />
                        Image
                    </Menu.Item>
                </Sidebar>

                <Sidebar
                    as={ Menu }
                    animation="overlay"
                    direction="right"
                    icon="labeled"
                    vertical
                    visible
                    width="thin"
                >
                    <Menu.Item onClick={ console.log }>
                        <Icon name="home" />
                        Home
                    </Menu.Item>
                    <Menu.Item onClick={ console.log }>
                        <Icon name="gamepad" />
                        Games
                    </Menu.Item>
                    <Menu.Item onClick={ console.log }>
                        <Icon name="camera" />
                        Channels
                    </Menu.Item>
                </Sidebar>

                <Sidebar.Pusher>
                    <Segment secondary textAlign="center">
                        <canvas ref={ canvasRef } className="studio-canvas"></canvas>
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </Segment>
    );
}

export default ImageStudio;