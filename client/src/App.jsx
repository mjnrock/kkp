import React, { Component } from "react";

import Lumen from "./Lumen";

class App extends Component {
    static contextType = Lumen;    // Effectively the "inject"

    componentDidMount() {
        // this.context.listen("prop-change", () => this.forceUpdate());
        this.context.watch("Bobs", () => this.forceUpdate());
        this.context.prop("Cats", 2452435);
    }
    
    render() {
        return (
            <div>
                <div>Bobs.Cat</div>
                <div>{ this.context.oprop("Bobs", "Cat") }</div>

                <button
                    onClick={ () => {
                        this.context.oprop("Bobs", "Cat", this.context.oprop("Bobs", "Cat") + 1)
                    }}
                >Add +1</button>
            </div>
        );
    }
}

export default App;