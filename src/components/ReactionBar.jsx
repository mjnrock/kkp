import React from "react";

import Reaction from "./Reaction";

function ReactionBar(props) {
    return (
        <div style={ props.style || {} }>
            {
                props.reactions.map(rp => (
                    <Reaction icon={ rp.icon } qty={ rp.qty } />
                ))
            }
        </div>
    );
}

export default ReactionBar;