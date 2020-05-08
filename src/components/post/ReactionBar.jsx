import React, { useContext } from "react";

import { Context } from "../../App";
import Reaction from "./Reaction";
import EmojiPicker from "./EmojiPicker";

function ReactionBar(props) {
    const { dispatch } = useContext(Context);
    const reactions = props.reactions || [];
    
    function onReaction(emoji) {
        dispatch({
            type: "REACTION",
            data: {
                emoji,
                postId: props.postId
            }
        });
    }

    return (
        <div style={ props.style || {} }>
            {
                props.showPicker !== false ? (
                    <EmojiPicker onSelect={ onReaction }/>
                ) : null
            }
            {
                reactions.map(rp => (
                    <Reaction onReaction={ onReaction } key={ rp.emoji } emoji={ rp.emoji } qty={ rp.qty } />
                ))
            }
        </div>
    );
}

export default ReactionBar;