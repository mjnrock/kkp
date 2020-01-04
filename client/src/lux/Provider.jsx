import React, { Component } from "react";
import Lux from "@lespantsfancy/lux";

const Lumen = React.createContext(new Lux.Core.ClassDecorators.StateEvents);

export default class Provider extends Component {
    constructor(props) {
        super(props);
        
        window.Lumen.listen("prop-change", () => this.forceUpdate());

        return React.createElement(this, { lumen: window.Lumen });
    }
};