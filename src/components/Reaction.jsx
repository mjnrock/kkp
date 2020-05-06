import React from "react";
import { Icon, Label } from "semantic-ui-react";

function Reaction(props) {
    return (
        <Label as="a" basic color="orange">
            <Icon.Group>
                <Icon name={ props.icon } />
                <Icon corner name="add" />
            </Icon.Group>
            
            <Label.Detail>{ props.qty }</Label.Detail>
        </Label>
    );
    // return (        
    //     <Button as="div" labelPosition="right">
    //         <Button basic icon color="grey" style={{ paddingRight: 14 }}>
    //             <Icon name={ `${ props.icon } grey` } />
    //         </Button>
    //         <Label icon basic color="orange" pointing="left">
    //             <span style={{ color: "#f2711c" }} >{ props.qty }</span>
    //         </Label>
    //     </Button>
    // );
}

export default Reaction;