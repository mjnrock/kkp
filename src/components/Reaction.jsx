import React from "react";
import { Icon, Label } from "semantic-ui-react";

function Reaction(props) {
    return (
        <Label as="a" basic color="grey">
            <span type="img" aria-label={ props.emoji }>{ props.emoji }</span>
            
            <Label.Detail>{ props.qty }</Label.Detail>
        </Label>
    );
}

export default Reaction;