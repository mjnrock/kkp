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
                <div>{ this.props.lux[ "Test" ] }</div>
            </div>
        );
    }
}

export default App;