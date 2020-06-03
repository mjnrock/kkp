import React, { useState } from "react";
import { Input, Table } from "semantic-ui-react";

import ColorPicker from "./../ColorPicker";

const Module = "draw";

function DrawToolbar(props) {
    const [ size, setSize ] = useState(3);
    const [ color, setColor ] = useState(5);

    if(props.layer) {
        console.log(props.layer)
    }

    return (
        <Table definition color="orange">
            <Table.Body>
                <Table.Row textAlign="center">
                    <Table.Cell width={ 3 }>Size</Table.Cell>
                    <Table.Cell width={ 10 }>
                        <Input style={{ width: "100%" }} type="range" min={ 1 } max={ 50 } value={ size } onChange={ e => {
                            props.onAction(Module, "size", ~~e.target.value);
                            setSize(e.target.value);
                        }} />
                    </Table.Cell>
                    <Table.Cell width={ 3 }>{ size }</Table.Cell>
                </Table.Row>

                <Table.Row textAlign="center">
                    <Table.Cell width={ 3 }>Color</Table.Cell>
                    <Table.Cell width={ 10 }>
                        {/* <Input style={{ width: "100%" }} type="range" min={ 0 } max={ 10 } value={ color } onChange={ e => {
                            props.onAction(Module, "color", e.target.value);
                            setColor(e.target.value);
                        }} /> */}
                        <ColorPicker onHex={ hex => {
                            props.onAction(Module, "color", hex);
                            setColor(hex);
                        }}/>
                    </Table.Cell>
                    <Table.Cell width={ 3 }>{ color }</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
}

export default DrawToolbar;