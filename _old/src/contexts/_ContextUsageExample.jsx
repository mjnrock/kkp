import React, { Component } from "react";

// Documentation: https://reactjs.org/docs/context.html
// There is clearly a better way to do this, as MobX uses this method, but this works and seems good enough
// The obvious issue is the use of `this.forceUpdate()`, but I'm not sure if even MobX uses a different paradigm?

import Lumen from "./Lumen";    //? Import the React::Context from external file

class App extends Component {
    static contextType = Lumen;     //? This is what tells React to inject @Lumen into `this.context`

    componentDidMount() {
        //? So that `this.context` can be used anywhere in the Component
        //* Use either `.listen` or `.watch`, depending on what part of the "state" is useful for the Component
        // this.context.listen("prop-change", () => this.forceUpdate());
        this.context.watch("Bobs", () => this.forceUpdate());

        //? Example showing that the addition of a prop will propagate to the React::Context as expected
        this.context.prop("Cats", 2452435);
    }
    
    render() {
        return (
            <div>
                <div>Bobs.Cat</div>
                //? Including the render method
                <div>{ this.context.oprop("Bobs", "Cat") }</div>

                <button
                    onClick={ () => {
                        this.context.oprop("Bobs", "Cat", this.context.oprop("Bobs", "Cat") + 1)
                    }}
                >Add +1</button>

                //? An example other Component connected to the React::Context, that will also see "Cats"
                {/* <Fish /> */}
            </div>
        );
    }
}

export default App;