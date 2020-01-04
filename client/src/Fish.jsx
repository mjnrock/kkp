import React, { Component } from "react";
import LuxContext from "./LuxContext";

class Fish extends Component {
    static contextType = LuxContext;

    componentDidMount() {
        // this.context.listen("prop-change", () => this.forceUpdate());
        this.context.watch("Test", () => this.forceUpdate());
    }
    
    render() {
        console.log(this.context);

        return (
            <div>
                <div>Test</div>
                <div>{ this.context.prop("Test") }</div>

                <button
                    onClick={ () => {
                        this.context.prop("Test", this.context.prop("Test") - 1)
                    }}
                >Add -1</button>
            </div>
        );
    }
}

export default Fish;