import React, { useState, useEffect } from "react";
import { Segment, Button, Icon, Message } from "semantic-ui-react";
import convert from "color-convert";

function ColorPicker(props) {
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
            lumCtx.fillStyle = `hsl(${ hue }, ${ saturation }%, ${ step }%)`;
            lumCtx.fillRect((lumW * step), 0, (lumW * step) || lumW, lumCanvas.height);
            lumCtx.fill();

            satCtx.fillStyle = `hsl(${ hue }, ${ step }%, ${ luminance }%)`;
            satCtx.fillRect((satW * step), 0, (satW * step) || satW, satCanvas.height);
            satCtx.fill();
        }

        hueCtx.fillStyle = `rgb(0, 0, 0)`;
        hueCtx.fillRect(~~hue - 1, 0, 3, hueCanvas.height);
        hueCtx.fill();
        hueCtx.fillStyle = `rgb(255, 255, 255)`;
        hueCtx.fillRect(~~hue, 0, 1, hueCanvas.height);
        hueCtx.fill();

        satCtx.fillStyle = `rgb(0, 0, 0)`;
        satCtx.fillRect(~~(saturation * satW) - 1, 0, 3, satCanvas.height);
        satCtx.fill();
        satCtx.fillStyle = `rgb(255, 255, 255)`;
        satCtx.fillRect(~~(saturation * satW), 0, 1, satCanvas.height);
        satCtx.fill();

        lumCtx.fillStyle = `rgb(0, 0, 0)`;
        lumCtx.fillRect(~~(luminance * lumW) - 1, 0, 3, lumCanvas.height);
        lumCtx.fill();
        lumCtx.fillStyle = `rgb(255, 255, 255)`;
        lumCtx.fillRect(~~(luminance * lumW), 0, 1, lumCanvas.height);
        lumCtx.fill();
    }, [ hueRef, satRef, lumRef, hue, saturation, luminance ]);

    useEffect(() => {
        if(typeof props.rgb === "function") {
            const [ r, g, b ] = convert.hsl.rgb(hue, saturation, luminance);
            props.rgb([ r, g, b ], `rgb(${ r }, ${ g }, ${ b })`);
        }

        if(typeof props.hex === "function") {
            const hex = convert.hsl.hex(hue, saturation, luminance);
            props.hex(hex, `#${ hex }`);
        }

        if(typeof props.hsl === "function") {
            props.hsl([ hue, saturation, luminance ], `hsl(${ hue }, ${ saturation }%, ${ luminance }%)`);
        }
    }, [ props, hue, saturation, luminance ]);

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

    function copyToClipboard() {
        const el = document.createElement("textarea");
        const value = `#${ convert.hsl.hex(hue, saturation, luminance) }`;
        el.value = value;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);

        console.info(`Copied ${ value }`);

        //! FireFox requires HTTPS to access the Clipboard API (which is gated by the Permissions API)
        //* https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
        //* https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API
        //* https://developer.mozilla.org/en-US/docs/Web/API/Element/copy_event
        // console.log(navigator.permissions);
        // navigator.permissions.query({ name: "clipboard-read" }).then(result => {
        //     if (result.state == "granted" || result.state == "prompt") {
        //         navigator.clipboard.read().then(data => console.log(data));
        //         // OR
        //         // navigator.clipboard.readText().then(clipText => document.querySelector(".editor").innerText += clipText);
        //     }
        // });
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
            
            <Button basic icon labelPosition="left" onClick={ copyToClipboard }>
                <Icon name="hashtag" />
                { convert.hsl.hex(hue, saturation, luminance) }
            </Button>
            <br />

            <Icon name="tint" />
            <canvas style={{ border: "1px solid #000", borderRadius: 4 }} ref={ hueRef } width={ 360 } height={ 40 } onMouseDown={ handleHue } onMouseMove={ handleHue } />
            <br />
            <Icon name="adjust" />
            <canvas style={{ border: "1px solid #000", borderRadius: 4 }} ref={ satRef } width={ 360 } height={ 40 } onMouseDown={ handleSaturation } onMouseMove={ handleSaturation } />
            <br />
            <Icon name="sun outline" />
            <canvas style={{ border: "1px solid #000", borderRadius: 4 }} ref={ lumRef } width={ 360 } height={ 40 } onMouseDown={ handleLuminance } onMouseMove={ handleLuminance } />            
        </Segment>
    );
}

export default ColorPicker;