import React from "react";
import { Input, Table } from "semantic-ui-react";
import { useState } from "react";

const Module = "emoji";

function EmojiToolbar(props) {
    const [ size, setSize ] = useState(3);

    return (
        <Table definition color="orange">
            <Table.Body>
                <Table.Row textAlign="center">
                    <Table.Cell width={ 3 }>Size</Table.Cell>
                    <Table.Cell width={ 10 }>
                        <Input style={{ width: "100%" }} type="range" min={ 0 } max={ 10 } value={ size } onChange={ e => {
                            props.onAction(Module, "size", e.target.value);
                            setSize(e.target.value);
                        }} />
                    </Table.Cell>
                    <Table.Cell width={ 3 }>{ size }</Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
}

export default EmojiToolbar;