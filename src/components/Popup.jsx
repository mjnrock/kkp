import React from "react";
import { Popup as SUIPopup } from "semantic-ui-react";

function Popup(props) {
    return (
        <SUIPopup
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
            trigger={ props.trigger }
        />
    );
}

export default Popup;