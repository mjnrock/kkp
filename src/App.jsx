import React, { useState } from "react";
import Canvas from "./Canvas";

function App() {
    const [ count, setCount ] = useState(0);

    return (
        <div>
            <p>Clicks: { count }</p>
            <button onClick={ e => setCount(c => c + 1) }>Click Me</button>
            <Canvas />
        </div>
    );
}

export default App;