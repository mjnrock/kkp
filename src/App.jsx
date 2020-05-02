import React, { useState, useEffect, useContext } from "react";
import Context from "./Context";
import Element from "./Element";
import Canvas from "./Canvas";
import Input from "./Input";

function useAJAX(uri) {
    const [ info, setInfo ] = useState("");
    useEffect(() => {
        async function fetchInfo() {
            console.log("CALLED")
            let data = await fetch(uri);

            setInfo(await data.json());
        };

        fetchInfo();
    }, [ uri ]);

    return JSON.stringify(info);
    // return info.people ? (
    //     info.people.map(p => (
    //         <div key={ p.name }>{ p.name }</div>
    //     ))
    // ) : (
    //     "Loading..."
    // );
}

// const CTX = Context.Context;
// console.log(CTX)

function App() {
    const CTX = useContext(Context.Context);
    //* Flag variable appears to be the easiest way to force an update, but has obvious "overuse" implications
    const [ lastUpdate, setLastUpdate ] = useState(CTX._lastUpdate);
    const [ count, setCount ] = useState(0);
    // const info = useAJAX("http://api.open-notify.org/astros.json");
    // const info = useAJAX("http://api.open-notify.org/iss-now.json");

    return (
        <div>
            <div>
                <p>{ CTX.test }</p>
                <p>Clicks: { count }</p>
                <button onClick={ e => { setLastUpdate(CTX.inc()); } }>Click Me</button>
            </div>
            <Element />
            <Element />
            <Canvas />
            <Canvas />
            <Input />
            {/* <div>{ info }</div> */}
        </div>
    );
}

export default App;