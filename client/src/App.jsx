import React, { Component } from "react";
import LuxContext from "./LuxContext";
import Fish from "./Fish";

class App extends Component {
    static contextType = LuxContext;    // Effectively the "inject"

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

                <Fish />
            </div>
        );
    }
}

export default App;