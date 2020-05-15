import React from "react";
import { Popup, Button, Icon } from "semantic-ui-react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

function EmojiPicker(props) {
    return (
        <Popup
            style={{
                padding: 2,
                borderRadius: 5,
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                ...(props.style || {})
            }}
            className="popup-container"
            content={(
                <Picker
                    title="Skin Tone:"
                    emoji={ "raised_hand_with_fingers_splayed" }
                    native={ true }
                    onSelect={ emoji => props.onSelect(emoji.native) }
                />
            )}
            on="click"
            pinned
            trigger={(
                <Button.Group>
                    <Button basic icon>
                        <Icon.Group>
                            <Icon name="star outline" style={{ fontSize: "1.25rem" }} />
                            <Icon corner name="add" />
                        </Icon.Group>
                    </Button>
                </Button.Group>
            )}
        />
    );
}

export default EmojiPicker;