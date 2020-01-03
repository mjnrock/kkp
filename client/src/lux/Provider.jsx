import React, { Component } from "react";

export default class Provider extends Component {
    constructor(props) {
        super(props);
        
        this.state = this.props.lux;
        this.state.watch("Lux", () => this.forceUpdate());
    }
    
    render() {
        const childrenWithProps = React.Children.map(this.props.children, child =>
            React.cloneElement(child, { lux: this.props.lux.prop("Lux") })
        );

        return (
            <div>{ childrenWithProps }</div>
        );
    }
};