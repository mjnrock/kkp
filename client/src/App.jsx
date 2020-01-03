import React, { Component } from "react";

class App extends Component {
    componentDidMount() {
        console.log(this.props);
    }

    componentDidUpdate() {
        console.log(this.props);
    }
    
    render() {
        return (
            <div>
                <div>Test</div>
                <div>{ this.props.store[ "Test" ] }</div>

                <button
                    onClick={ () => {
                        this.props.Lux.oprop("Lux", "Test", this.props.store[ "Test" ] + 1)
                    }}
                >Click Me</button>
            </div>
        );
    }
}

export default App;