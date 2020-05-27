import React from "react";
import { Input, Table } from "semantic-ui-react";
import { useState } from "react";

function DrawToolbar(props) {
    const [ size, setSize ] = useState(3);
    const [ color, setColor ] = useState(5);

    return (
        <Table definition color="orange">
            <Table.Body>
                <Table.Row textAlign="center">
                    <Table.Cell width={ 3 }>Size</Table.Cell>
                    <Table.Cell width={ 10 }>
                        <Input style={{ width: "100%" }} type="range" min={ 0 } max={ 10 } value={ size } onChange={ e => setSize(e.target.value) } />
                    </Table.Cell>
                    <Table.Cell width={ 3 }>{ size }</Table.Cell>
                </Table.Row>

                <Table.Row textAlign="center">
                    <Table.Cell width={ 3 }>Color</Table.Cell>
                    <Table.Cell width={ 10 }>
                        <Input style={{ width: "100%" }} type="range" min={ 0 } max={ 10 } value={ color } onChange={ e => setColor(e.target.value) } />
                    </Table.Cell>
                    <Table.Cell width={ 3 }>{ color }</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
}

export default DrawToolbar;