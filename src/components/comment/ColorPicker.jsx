import React, { useState, useEffect } from "react";
import { Segment } from "semantic-ui-react";

function ColorPicker() {
    const hueRef = React.createRef();
    const satRef = React.createRef();
    const lumRef = React.createRef();

    const [ hue, setHue ] = useState(0);
    const [ saturation, setSaturation ] = useState(100);
    const [ luminance, setLuminance ] = useState(50);
    
    useEffect(() => {
        const hueCanvas = hueRef.current;
        const hueCtx = hueCanvas.getContext("2d");

        hueCtx.moveTo(0, 0);
        for(let step = 0; step < hueCanvas.width; step++) {
            hueCtx.strokeStyle = `hsl(${ step }, 100%, 50%)`;
            hueCtx.beginPath();
            hueCtx.moveTo(step, 0);
            hueCtx.lineTo(step, hueCanvas.height);
            hueCtx.closePath();
            hueCtx.stroke();
        }

        const lumCanvas = lumRef.current;
        const lumCtx = lumCanvas.getContext("2d");
        const satCanvas = satRef.current;
        const satCtx = satCanvas.getContext("2d");

        let lumW = lumCanvas.width / 100;
        let satW = satCanvas.width / 100;
        for(let step = 0; step < 100; step++) {
            lumCtx.fillStyle = `hsl(${ hue }, 100%, ${ step }%)`;
            lumCtx.fillRect((lumW * step), 0, (lumW * step) || lumW, lumCanvas.height);
            lumCtx.fill();

            satCtx.fillStyle = `hsl(${ hue }, ${ step }%, 50%)`;
            satCtx.fillRect((satW * step), 0, (satW * step) || satW, satCanvas.height);
            satCtx.fill();
        }
    }, [ hueRef, satRef, lumRef ]);

    function handleHue(e) {
        if(e.buttons === 1) {
            const rect = e.target.getBoundingClientRect();
            const x = ~~(e.clientX - rect.x);
            
            setHue(x);
        }
    }

    function handleSaturation(e) {
        if(e.buttons === 1) {
            const rect = e.target.getBoundingClientRect();
            const x = ~~(e.clientX - rect.x);
            const w = ~~(x / rect.width * 100);
            
            setSaturation(w);
        }
    }

    function handleLuminance(e) {
        if(e.buttons === 1) {
            const rect = e.target.getBoundingClientRect();
            const x = ~~(e.clientX - rect.x);
            const w = ~~(x / rect.width * 100);
            
            setLuminance(w);
        }
    }

    return (
        <Segment>
            <Segment
                style={{
                    backgroundColor: `hsl(${ hue }, ${ saturation }%, ${ luminance }%)`,
                    width: 255,
                    height: 255,
                }}
            />

            <canvas ref={ hueRef } width={ 360 } height={ 40 } onMouseDown={ handleHue } onMouseMove={ handleHue } />
            <br />
            <canvas ref={ satRef } width={ 360 } height={ 40 } onMouseDown={ handleSaturation } onMouseMove={ handleSaturation } />
            <br />
            <canvas ref={ lumRef } width={ 360 } height={ 40 } onMouseDown={ handleLuminance } onMouseMove={ handleLuminance } />            
        </Segment>
    );
}

export default ColorPicker;