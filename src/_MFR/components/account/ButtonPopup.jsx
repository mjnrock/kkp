import React from "react";
import { Popup, Button, Icon } from "semantic-ui-react";

function ButtonPopup(props) {
    return (
        <Popup
            style={{
                padding: 2,
                borderRadius: 5,
                backgroundColor: "rgba(0, 0, 0, 0.05)",
                ...(props.style || {})
            }}
            className="popup-container"
            content={ props.children }
            on="click"
            pinned
            trigger={(
                <Button icon>
                    <Icon name={ props.icon } />
                </Button>
            )}
        />
    );
}

export default ButtonPopup;