import React from "react";
import { Input, Table } from "semantic-ui-react";
import { useState } from "react";

const Module = "image";

function ImageToolbar(props) {
    return (
        <Table definition color="orange">
            <Table.Body>
                <Table.Row textAlign="center">
                    <Table.Cell></Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    );
}

export default ImageToolbar;