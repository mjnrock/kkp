import React, { useState, useEffect, useContext }  from "react";
import ReactDOM from "react-dom";
import { fabric as Fabric } from "fabric";
import { Segment } from "semantic-ui-react";

import { Context } from "../../App";

function Canvas(props) {
    const canvasRef = React.createRef();
    const { config, fabric } = useContext(Context);
    const [ image, setImage ] = useState({});

    useEffect(() => {
        const canvas = ReactDOM.findDOMNode(canvasRef.current);

        if(canvas && props.filename) {
            let img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => {
                const ar = img.width / img.height;
                let height = Math.min(img.height, 500);
                let width = height * ar;

                fabric.initialize(canvas, {
                    width,
                    height,
                    fireRightClick: true,
                    fireMiddleClick: true,
                    stopContextMenu: true,
                    preserveObjectStacking: true,
                    fill: "transparent"
                });

                var imgInstance = new Fabric.Image(img);
                imgInstance.scale(width / img.width);
                fabric.add(imgInstance);
                
                setImage(img);
            }
            img.src = config.api.Image(props.filename);
        }
    }, [ props.filename ]);

    return (
        <canvas ref={ canvasRef } style={{ border: "1px solid #fff" }} />
    );
}

export default Canvas;