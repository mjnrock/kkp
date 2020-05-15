/* eslint-disable */
import React from "react";

import Reaction from "./Reaction";
import EmojiPicker from "./EmojiPicker";

function ReactionBar(props) {
    const reactions = aggregateReactions(props.reactions);

    function aggregateReactions(reactions) {
        let reacts = {};
        reactions.forEach(reaction => {
            reacts[ reaction.emoji ] = (reacts[ reaction.emoji ] || 0) + 1;
        });

        return Object.entries(reacts);
    }

    return (
        <div style={ props.style || {} }>
            {
                props.showPicker !== false ? (
                    <EmojiPicker onSelect={ props.onReaction }/>
                ) : null
            }
            {
                reactions.length ?
                reactions.map(([ emoji, qty ]) => (
                    <Reaction onReaction={ props.onReaction } key={ emoji } emoji={ emoji } qty={ qty } size={ props.size } />
                )) : (
                    <EmojiPicker onSelect={ props.onReaction } trigger={
                        <a href="#">Add a reaction!</a>
                    }/>
                )
            }
        </div>
    );
}

export default ReactionBar;