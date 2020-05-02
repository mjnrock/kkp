import React, { useState, useEffect, Fragment } from "react";

function Canvas() {
    const canvasRef = React.createRef();
    const [ file, setFile ] = useState();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if(file) {
            const img = new Image();
            img.onload = () => ctx.drawImage(img, 0, 0);
            // img.src = "./pusheen.png";  //? The image is relative to the HTML file, NOT the JSX file
            img.src = URL.createObjectURL(file);
        }
    }, [ file ]);

    return (
        <Fragment>
            <input type="file" onChange={ e => setFile(e.target.files[ 0 ]) } />
            <canvas
                ref={ canvasRef }
                width={ 500 }
                height={ 500 }
            ></canvas>
        </Fragment>
    );
}

export default Canvas;