import React from "react";
import { Label } from "semantic-ui-react";
import { Emoji } from "emoji-mart";

function Reaction(props) {
    return (
        <Label className="noselect" as="a" basic color="grey" onClick={ e => props.onReaction(props.emoji) }>
            <Emoji emoji={ props.emoji } size={ 16 } native={ true } />
            
            <Label.Detail className={ props.size || "medium-icon" }>{ props.qty }</Label.Detail>
        </Label>
    );
}

export default Reaction;