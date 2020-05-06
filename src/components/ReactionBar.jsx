import React from "react";
import { Popup, Button, Icon } from "semantic-ui-react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

import Reaction from "./Reaction";

function ReactionBar(props) {
    return (
        <div style={ props.style || {} }>
            <Popup
                className="emoji-popup-container"
                content={(
                    <Picker
                        title="Skin Tone:"
                        emoji={ "raised_hand_with_fingers_splayed" }
                        native={ true }
                        onSelect={ emoji => console.log(emoji) }
                    />
                )}
                on="click"
                pinned
                trigger={(
                    <Button.Group>
                        <Button basic icon>
                            <Icon.Group>
                                <Icon name="smile outline" />
                                <Icon corner name="add" />
                            </Icon.Group>
                        </Button>
                    </Button.Group>
                )}
            />
            {
                props.reactions.map(rp => (
                    <Reaction key={ rp.emoji } emoji={ rp.emoji } qty={ rp.qty } />
                ))
            }
        </div>
    );
}

export default ReactionBar;